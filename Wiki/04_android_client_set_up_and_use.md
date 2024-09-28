# Android Client Set Up and Use

## Installation

To get started with the Android client, follow these steps:

**Open your code editor/IDE**

### Set up the Android Application

Assuming both Node.js and CPP server are running, follow these steps to run the application for an Android client:

1. Open the project in Android Studio
2. Build the application
3. Run the application on an Android emulator

## User Permissions
Please notice that only logged-in users are able to perform the following actions:
- Upload a video
- Edit or delete it's own videos
- Edit or delete it's own account
- Leave a comment or delete it
- Get recommendations based on it's watch history

Please note that in order to do all of these, our server gives the user a JWT when logging-in to the account, which expires within 1 hour.
After that time, the user will not be able to upload, edit or delete anything. The user can sign-out and then sign-in again and then will be able to perform these actions.

## Walk-Through - Use the Application

### Home screen

- Consists of top 10 most viewed videos and 10 more random videos:

- Search for videos using the search bar or the tag buttons:  
  <img src="https://github.com/user-attachments/assets/8eb3b398-df6e-4602-bf73-7fb7e7421a87" alt="image" width="500">

### Register and log-in

- Registration:  
  <img src="https://github.com/user-attachments/assets/a5e84f78-e536-4de8-95f4-7326b7b78f3f" alt="image" width="500">    
  <img src="https://github.com/user-attachments/assets/64736ca8-42de-417e-9cb5-1f14353ff08f" alt="image" width="500">

- Sign in:  
  <img src="https://github.com/user-attachments/assets/b9cd87aa-8590-4dd8-9ca7-280dd8a1e6a9" alt="image" width="500">

### Upload videos, edit and delete them

- Upload video screen:  
  <img src="https://github.com/user-attachments/assets/1b9aaf20-af5d-4914-83ea-348f790354fb" alt="image" width="500">

- When logged-in as the video's uploader, you can edit the video details or delete your video:  
  <img src="https://github.com/user-attachments/assets/1b0a8225-b36f-4465-9c9e-313e9a151869" alt="image" width="500">  
  <img src="https://github.com/user-attachments/assets/5373570f-0312-4c01-8694-0578668d04dd" alt="image" width="500">  
  <img src="https://github.com/user-attachments/assets/aa21a76f-fd3c-401e-b3e1-6bf48a2c9c59" alt="image" width="500">

### Watch videos and get recommendations for other videos
<img src="https://github.com/user-attachments/assets/6dbf6d3a-2e11-47e4-8ba9-e6160adceb24" alt="image" width="500">  

### Leave comments, edit or delete them
<img src="https://github.com/user-attachments/assets/f1bc571e-5325-4dfb-bf12-e7a32d27298b" alt="image" width="500">  

### User profile

- When you are logged in, you can click on your profile picture on the right top corner,
  see your profile with your videos and change your profile picture and display name:  
  <img src="https://github.com/user-attachments/assets/c7ee6fb0-82ad-4845-8d76-f124f415308e" alt="image" width="500">

- Clicking on some user's username you can visit their profile:  
  <img src="https://github.com/user-attachments/assets/d07a2b57-3217-4e73-9811-3f065862223f" alt="image" width="500">

### Dark Mode

Our web application also supports a dark mode theme:  
<img src="https://github.com/user-attachments/assets/4618befe-221b-44c2-93be-9812be2a9830" alt="image" width="500">  
<img src="https://github.com/user-attachments/assets/acc187c5-827a-46e7-9779-1605c9b8f5ec" alt="image" width="500">
