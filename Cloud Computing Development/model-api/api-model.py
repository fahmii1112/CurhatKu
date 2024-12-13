from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pickle
import requests
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import re
import nltk
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from nltk.corpus import stopwords

MODEL_URL = "https://storage.googleapis.com/curhatku-model/emotion_prediction.keras"

nltk.download('stopwords')

# Fungsi untuk memuat model dari URL
def load_model_from_url(url):
    try:
        # Download the .keras model using tf.keras.utils.get_file
        model_path = tf.keras.utils.get_file('emotion_prediction_model.keras', url)
        model = tf.keras.models.load_model(model_path)  # Load the Keras model
        print("Model loaded successfully!")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

# Muat model saat server dimulai
model = load_model_from_url(MODEL_URL)

# Muat tokenizer dari file pickle
with open('tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

# Fungsi untuk preprocessing teks
factory = StemmerFactory()
stemmer = factory.create_stemmer()
stop_words = set(stopwords.words('indonesian'))

def preprocess_text(text):
    text = re.sub(r'[^\w\s]', '', text)
    text = text.lower()
    text = ' '.join([word for word in text.split() if word not in stop_words])
    text = ' '.join([stemmer.stem(word) for word in text.split()])
    return text.split()

# Fungsi prediksi emosi
def predict_emotion(text):
    processed_text = preprocess_text(text)

    sequence = tokenizer.texts_to_sequences([processed_text])
    padded_sequence = pad_sequences(sequence, padding='post')  # Sesuaikan panjang sequence

    prediction = model.predict(padded_sequence)

    # Get the index of the emotion with the highest probability
    top_index = np.argmax(prediction[0])

    emotions = ['Waspada', 'Marah', 'Jijik', 'Takut', 'Senang', 'Sedih', 'Terkejut', 'Percaya']

    # Return only the emotion name
    return emotions[top_index]

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    text = request.json['text']
    try:
        top_emotion = predict_emotion(text)
        return jsonify({'emotion': top_emotion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
