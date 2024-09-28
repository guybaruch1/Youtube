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

  <img src="" alt="image" width="250">


### Home screen

- Consists of top 10 most viewed videos and 10 more random videos:

- Search for videos using the search bar or the tag buttons:  

### Register and log-in

- Registration:  

- Sign in:  


### Upload videos, edit and delete them

- Upload video screen:  


- When logged-in as the video's uploader, you can edit the video details or delete your video:

### Watch videos and get recommendations for other videos
  

### Leave comments, edit or delete them
  

### User profile

- When you are logged in, you can click on your profile picture on the right top corner,
  see your profile with your videos and change your profile picture and display name:  


- Clicking on some user's username you can visit their profile:  


### Dark Mode

Our web application also supports a dark mode theme:  
