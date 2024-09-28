# Web Client Set Up and Use

## Installation

To run the project as a web client, follow these steps:

### Open your code editor/IDE:

Assuming you opened the project in your code editor/IDE under Youtube folder, follow the next steps:

### Install dependencies:
```bash
cd youtube
npm install react
npm run build
```

Assuming the server is already running, the application should now be running on [http://localhost:8080](http://localhost:8080).

Please note that the JWT you get when log-in to your account expires within 1 hour. 
After that time, you will not be able to upload, edit or delete anything. You can sign-out and then sign-in again and you will be able to perform these actions.

## Walk-Through - Use the Application

### Home screen

Consists of top 10 most viewed videos and 10 more random videos:
![Homescreen](https://github.com/user-attachments/assets/94f3f043-36dd-42bb-aa52-726954517fa5)

Search for videos using the search bar or the tag buttons:
![Search](https://github.com/user-attachments/assets/8eb3b398-df6e-4602-bf73-7fb7e7421a87)

### Register and log-in 

Registration:
![Register](https://github.com/user-attachments/assets/a5e84f78-e536-4de8-95f4-7326b7b78f3f)
![Register part 2](https://github.com/user-attachments/assets/64736ca8-42de-417e-9cb5-1f14353ff08f)

Sign in:
![Sign in](https://github.com/user-attachments/assets/b9cd87aa-8590-4dd8-9ca7-280dd8a1e6a9)

### Upload videos, edit and delete them

Upload video screen:
![Upload Video](https://github.com/user-attachments/assets/1b9aaf20-af5d-4914-83ea-348f790354fb)


When logged-in as the video's uploader, you can edit the video details or delete your video:
![Edit video](https://github.com/user-attachments/assets/1b0a8225-b36f-4465-9c9e-313e9a151869)
![Edit video 2](https://github.com/user-attachments/assets/5373570f-0312-4c01-8694-0578668d04dd)
![Edit video 3](https://github.com/user-attachments/assets/aa21a76f-fd3c-401e-b3e1-6bf48a2c9c59)

### Watch videos and get recommendations for other videos
![Watch video](https://github.com/user-attachments/assets/6dbf6d3a-2e11-47e4-8ba9-e6160adceb24)


### Leave comments, edit or delete them
![Leave a comment](https://github.com/user-attachments/assets/f1bc571e-5325-4dfb-bf12-e7a32d27298b)

### User profile

When you are logged in, you can click on your profile picture on the right top corner,
see your profile with your videos and change your profile picture and display name:
![User profile](https://github.com/user-attachments/assets/c7ee6fb0-82ad-4845-8d76-f124f415308e)

Clicking on some user's username you can visit their profile:
![Other user profile](https://github.com/user-attachments/assets/d07a2b57-3217-4e73-9811-3f065862223f)

### Dark Mode
Our web application also supports a dark mode theme:
![12 - dark mode](https://github.com/user-attachments/assets/4618befe-221b-44c2-93be-9812be2a9830)
![13 - dark mode](https://github.com/user-attachments/assets/acc187c5-827a-46e7-9779-1605c9b8f5ec)


