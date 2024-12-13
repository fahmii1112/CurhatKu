from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import re
import requests
from io import BytesIO

# URL model di Google Cloud Storage (ganti dengan URL model Anda)
MODEL_URL = "https://storage.googleapis.com/<bucket-name>/<file-name>"

# Fungsi untuk memuat model dari URL
def load_model_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        model = tf.keras.models.load_model(BytesIO(response.content))
        print("Model loaded successfully!")
        return model
    else:
        raise Exception(f"Failed to load model. Status code: {response.status_code}")

# Muat model saat server dimulai
model = load_model_from_url(MODEL_URL)

# Inisialisasi tokenizer (harus sesuai dengan tokenizer yang digunakan saat preprocessing)
tokenizer = Tokenizer()

# Fungsi untuk preprocessing teks
def preprocess_text(text):
    stop_words = set(stopwords.words('indonesian'))
    text = re.sub(r'[^\w\s]', '', text)
    text = text.lower()
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text.split()

# Fungsi prediksi emosi
def predict_emotion(text):
    processed_text = preprocess_text(text)
    sequence = tokenizer.texts_to_sequences([processed_text])
    padded_sequence = pad_sequences(sequence, maxlen=100, padding='post')  # Sesuaikan panjang sequence
    prediction = model.predict(padded_sequence)
    prediction_class = np.argmax(prediction)
    emotions = ['Waspada', 'Marah', 'Jijik', 'Takut', 'Senang', 'Sedih', 'Terkejut', 'Percaya']
    return emotions[prediction_class]

# Membuat aplikasi Flask
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    text = request.json['text']
    try:
        emotion = predict_emotion(text)
        return jsonify({'emotion': emotion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
