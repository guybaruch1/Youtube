# 89-3210 Course - Exercise 3 - Youtube Project with Server Side - Android 

This project is a simplified version of YouTube, allowing users to watch videos as a guest or a registered user, so you can upload videos, write comments and see other user's profiles and their videos.

In this exercise, we were asked to add a server to the android application so it consists of two main folders:
1. android - this is the client side, created using the project android files from the first exercise and modified to work with the server by implementing MVVM model and Room database
3. server – as the name implies, this is the server folder. Using express and mongoose

Please note:
1. **main** branch is the branch for exercise 1
2. **part_2_main** is the branch for exercise 2
3. **main_part_3** is the branch for exercise 3
   
## A brief explanation about the workflow:

1.	Analysing the requirements from the exercise’s pdf
2.	Putting the requirements in a jira project
3.	Dividing related tasks to each group member (for example, registration and sign-in and user profile is one part and upload videos and comments is another). Each group member with a feature branch of its own
4.	Merging everything and working on the main branch until the submitted version
   
Link to Jira: https://tomerbarak2.atlassian.net/jira/software/projects/YOUT/boards/4

## Features
- Home screen suggests top 10 most viewed videos and 10 more random videos
- Watch videos
- User registration and sign in
- Upload videos for registered users
- User profile that shows the videos uploaded by them
- Logged-in users can comment on videos or edit/delete them
- Logged-in users can edit/delete their videos
- Logged-in users can edit/delete its account
- Dark mode and light mode

## Installation

To get started with the project, follow these steps:

**Clone the repository:**
 get to your desired folder and clone the repository with the following command:
```bash
git clone https://github.com/guybaruch1/Youtube
cd Youtube
git checkout main_part_3
git pull origin main_part_3
```

### Set up MongoDB to work with our app
In order to show the users, videos and comments we created, you need to follow these steps:

**1. Make sure you have MongoDB installed**

**2. Import relevant collections**
These instructions are for MongoDB compass, but you can also use shell if you wish.
Go to Youtube/csv_files. There you can find 2 csv files for our collections.
Under "test" database in MongoDB (you can use whatever MongoDB port you want), create two collections:
1. usermodels
2. videomodels

for each one of them:
- Click "ADD DATA +"
- Choose "Import JSON or CSV file"
- Choose the right CSV file, provided in the CSV folder

Most importantly, for videomodel you have to make sure uploaderId is set to be ObjectId as in the picture:

<img src="https://github.com/user-attachments/assets/4b05d7ee-4512-4e00-b21a-20bb3c5ffe45" alt="image" width="800">

**Drop `id_1` Index:**
In case an `id_1` index appears in the `videomodels` collection in the `test` database (or the database you use), user will be limited to upload just a single video.
The solution is dropping it using the following command in your MongoDB Compass under Indexes or via MongoDB shell:
```bash
use test
db.videomodels.dropIndex("id_1")
```
### Set up the server

**Open your code editor/IDE**

**Create a configuration file:**
under server/config, create a file called ".env.local" which consist the following lines:

```
CONNECTION_STRING = "mongodb://localhost:YOUR_PORT_OF_CHOICE"
PORT = 8080
SECRET_KEY=your_secret_key
```

Make sure port is "8080" and SECRET_KEY is "your_secret_key" as defined above. However, you can choose your own MongoDB port.

**Run the server:**
 start the development server using
```bash
cd Youtube/server
npm install custom-env express body-parser cors mongoose path
npm start
```

### Set up the android application

1. Open the project in Android Studio
2. Build the application 
3. Run the application on an Android emulator

Please note that the JWT you get when log-in to your account expires within 1 hour. After that time, you will not be able to upload, edit or delete anything. You can sign-out and then sign-in again and you will be able to perform these actions.

## Some screenshots and videos from the application

**Homescreen:** you should see in your homescreen 20 videos (10 of them are the most viewed videos and 10 of them are random) in random order:

<img src="https://github.com/user-attachments/assets/c0a2a379-8c50-467e-9e3f-21724ad76b42" alt="image" width="250">

**Get to your profile:** when you sign in, you can access to your user profile clicking on the upperbar:

<img src="https://github.com/user-attachments/assets/c5f92259-04df-46f9-8444-d0472735de38" alt="Get to your profile" width="250">

**User profile:** this is how your proflie looks when you uploaded videos:

<img src="https://github.com/user-attachments/assets/72540528-5a6f-4992-9e9a-bae1d72b50e7" alt="User profile" width="250">

**Some more screenshots from the application**:

<img src="https://github.com/user-attachments/assets/3b0da25b-185d-4ebf-a0ee-d78ecca4ab42" alt="Screenshot" width="250">

<img src="https://github.com/user-attachments/assets/3cb4d5bd-a075-41f2-9f99-4993c16395f8" alt="Screenshot" width="250">

Enjoy the watch!


![Screenshot 2024-09-24 163405](https://github.com/user-attachments/assets/789b5f1f-878a-4d57-977b-21c162112894)
