# Android Client Set Up and Use

## Installation

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
  
<img src="https://github.com/user-attachments/assets/f722a1ad-6b5e-4773-8871-aed81016a59d" alt="image" width="250">  

- Search for videos using the search bar or the tag buttons:
  
<img src="https://github.com/user-attachments/assets/94f19a5d-3361-44ca-8f4d-b8244640f60a" alt="image" width="250">

### Register and log-in

- Registration:  
<img src="https://github.com/user-attachments/assets/58dedd52-5d8f-4551-8c39-8f88158d6fb6" alt="image" width="250">  

- Sign in:  
<img src="https://github.com/user-attachments/assets/71cf277e-785f-4318-a0fc-8eec60129c61" alt="image" width="250">

### Upload videos, edit and delete them

- Upload video screen:  
<img src="https://github.com/user-attachments/assets/f7655bd8-2de4-4cc5-a63b-50ad091a087d" alt="image" width="250">

- When logged-in as the video's uploader, you can edit the video details or delete your video:  
<img src="https://github.com/user-attachments/assets/4f1fb5ba-bce7-4307-b736-fe010919ccef" alt="image" width="250">
<img src="https://github.com/user-attachments/assets/048d00c3-583e-466f-8327-4a47d597e26d" alt="image" width="250">
<img src="https://github.com/user-attachments/assets/53ef07ea-3921-40b3-b58b-307cfdb06f0d" alt="image" width="250">

### Watch videos and get recommendations for other videos
<img src="https://github.com/user-attachments/assets/5b338e51-f036-4f5c-bacb-9b4006055444" alt="image" width="250">  

### Leave comments, edit or delete them  
<img src="https://github.com/user-attachments/assets/42f93495-b351-4d2f-a678-35781fcb9d32" alt="image" width="250">

### User profile  

- When you are logged in, you can click on your profile picture on the right top corner, 
see your profile with your videos and change your profile picture and display name:  
<img src="https://github.com/user-attachments/assets/694fc721-63ac-4e1c-928f-cb8a67222594" alt="image" width="250">

- Clicking on some user's username when watching it's video, you can visit their profile:  
<img src="https://github.com/user-attachments/assets/fd3aa651-093c-4e90-a10a-50729b639886" alt="image" width="250">

### Dark Mode

Our web application also supports a dark mode theme:  
<img src="https://github.com/user-attachments/assets/c231fd59-54df-4955-97f7-2d088fe4958e" alt="image" width="250">  
<img src="https://github.com/user-attachments/assets/a53d1a5e-d6f5-4892-9934-c05ceef3c908" alt="image" width="250">
