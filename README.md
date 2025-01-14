
<br />
<p align="center">
  <a href="https://github.com/DzakaAl/CurhatKu">
    <img src="Logo_1.png" width='400dp' alt="Logo" >
  </a>

  <h3 align="center">CurhatKu</h3>

  <p align="center">
    CurhatKu is a mental health app offering a safe space for self-expression, professional support, and resources. Key features include an anonymous forum, psychologist consultations, and mental health articles. It uses AI to detect emotions from forum posts and provide personalized support.

   This is a project to fulfill the  <a href="https://grow.google/intl/id_id/bangkit/"><strong>Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka </strong></a>
   Program.
    <br />
    <a href="https://github.com/DzakaAl/CurhatKu"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/DzakaAl/CurhatKu">View Demo</a>
  </p>
</p>

<details open="open">
  <summary>Contents of the Project</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#machine-learning-documentation">Machine Learning Development Documentation</a></li>
        <li><a href="#mobile-development-documentation">Mobile Development Documentation</a></li>
        <li><a href="#cloud-computing-documentation">Cloud Computing Documentation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Indonesia faces rising mental health challenges, with 9.8% of the population affected and limited access to services. Social stigma and a lack of resources prevent many from seeking help, leaving a critical gap in support. CurhatKu addresses this need by providing an accessible platform for emotional support, professional guidance, and education. The app’s purpose is to empower individuals to manage their mental health by creating a safe, stigma-free space for self-expression and support.

## Machine Learning Documentation

The project is based on Google Colab (due to limited system requirements of our laptop/PC). It uses Machine Learning with TensorFlow as the framework to classify emotions.

Link to Colab:  
[Google Colab Link](https://colab.research.google.com/drive/1g_BbxB5QX2NYm4iZ8JkMhMbG0Ahtbz25?usp=sharing)

### 1. Download Dataset
  - Download the dataset from Hugging Face using this link:  
  [Hugging Face Dataset](https://huggingface.co/datasets/elvanromp/emosi)

### 2. Pre-processing Datasets
  - Defining target and feature from the existing CSV file:
    - `df['label']` as target
    - `df['text']` as feature
  - Splitting datasets into:
    - 80% for training data
    - 20% for test data

### 3. Training
   - Using GRU (Gated Recurrent Units) to improve model accuracy.
   - Using `SparseCategoricalCrossentropy` as loss function.
   - Using `Adam` as optimizer.
   - Added more layers to `model.Sequential` to improve model accuracy:
     - Added `Embedding` layer
     - Added `GRU(64, return_sequences=True, activation='relu')` layer
     - Added `GRU(32, return_sequences=False, activation='relu')` layer
     - Added `Dropout(0.5)` layer
     - Added `Dense(units=8, activation='Softmax')` layer
   - Trained the model with 10 epochs.
   - Results:
     - `loss: 17%`
     - `accuracy: 96%`
     - `val_loss: 23%`
     - `val_accuracy: 94%`

### 4. Saved the Model to Keras
  - The model was saved in the `.keras` format.

## Mobile Development Documentation
- ### Features

      * **Splash screen**, in this application there is a splashscreen before entering the main page.

      * **Article**, there is displays articles about mental health.

      * **Emergency Call**,  there are contacts there if you need an emergency call.

      * **Consultation**, You can make a consultation appointment with an expert.

      * **Forum**,  Here you can share your concerns about mental health.

* #### Dependencies :
  - [Lifecycle & Livedata](https://developer.android.com/jetpack/androidx/releases/lifecycle)
  - [Navigation Component](https://developer.android.com/jetpack/androidx/releases/navigation)
  - [kotlinx-coroutines](https://developer.android.com/kotlin/coroutines)    
  - [Retrofit 2](https://square.github.io/retrofit/)    
  - [Glide](https://github.com/bumptech/glide)    
  - [Ok Http 3](https://square.github.io/okhttp/)

### Getting Started Application

  - ### Prerequisites
       - ##### Tools Sofware
        1. Android Studio at least version 4.1. [Android Studio](https://developer.android.com/studio)
        2. JRE (Java Runtime Environment) or JDK (Java Development Kit).

## Cloud Computing Documentation

### 1. Google Cloud Platform Setup
- Create new project
- Create Google Cloud Storage 
- Create Artifact Registry

### 2. Build Authentication, Article, and Forum APIs
- Create database using Firestore to save user data, forum contents, and prediction
- Build the API using node.js and express framework 
- Connect the API to the Firestore database

### 3. Build Machine Learning Model API
- Store the model in Google Cloud Storage
- Build the API using Phyton and Flask framework

### 4. Deplyoment
- Create Docker image and push it to the Artifact Registry
- Deploy using Google Cloud Run

## Contributing

Contributions are the heart of the open-source community, making it an incredible space to learn, inspire, and innovate. Every contribution, big or small, is valued and helps drive the growth and success of the project. Your efforts are truly appreciated!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/yourFeature)
3. Commit your Changes (git commit -m 'Add yourFeature')
4. Push to the Branch (git push origin feature/yourFeature)
5. Open a Pull Request

<p align="center">
  <a href="https://github.com/DzakaAl/CurhatKu">
    <img src="Logo_1.png" width='300dp' alt="Logo Teks" >
  </a>
</p>

## Contact

- [M. Dzaka Al Fikri](https://www.linkedin.com/in/m-dzaka-al-fikri-7bba421a4/)
- [Adi Suswiantara](https://www.linkedin.com/in/adi-suswiantara-48643a252/)
- [Muhammad Dicry Sirot Nur Fahmi](https://www.linkedin.com/in/muhammad-dicry-sirot-nur-fahmi-a6b572216/)
- [Muhammad Naufal Dzaky](https://www.linkedin.com/in/muhammad-naufal-dzaky-85ab63269/)
- [Musyafa Al Adn](https://www.linkedin.com/in/musyafa-al-adn-30111526b/)
- [Aqef Idlan Hakimi](https://www.linkedin.com/in/aqief-hakimi-37ab5b27a/)
- [Naufal Zafrany Syamsudin](https://www.linkedin.com/in/naufal-zafrany-b77299327/)
