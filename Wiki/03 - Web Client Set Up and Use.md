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
![img.png](Screenshots/Web/img.png)

Search for videos using the search bar or the tag buttons:
![img_1.png](Screenshots/Web/img_1.png)

### Register and log-in 

Registration:
![img_2.png](Screenshots/Web/img_2.png)
![img_3.png](Screenshots/Web/img_3.png)

Sign in:
![img_4.png](Screenshots/Web/img_4.png)

### Upload videos, edit and delete them

Upload video screen:
![img_6.png](Screenshots/Web/img_6.png)

When logged-in as the video's uploader, you can edit the video details or delete your video:
![img_7.png](Screenshots/Web/img_7.png)
![img_8.png](Screenshots/Web/img_8.png)
![img_9.png](Screenshots/Web/img_9.png)

### Watch videos and get recommendations for other videos

![img_14.png](Screenshots/Web/img_14.png)

### Leave comments, edit or delete them
![img_15.png](Screenshots/Web/img_15.png)

### User profile

When you are logged in, you can click on your profile picture on the right top corner,
see your profile with your videos and change your profile picture and display name:

![img_10.png](Screenshots/Web/img_10.png)

Clicking on some user's username you can visit their profile:
![img_11.png](Screenshots/Web/img_11.png)

### Dark Mode

Our web application also supports a dark mode theme:

![img_12.png](Screenshots/Web/img_12.png)
![img_13.png](Screenshots/Web/img_13.png)
