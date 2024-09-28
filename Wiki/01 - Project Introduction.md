# Project Introduction

This project is a simplified version of YouTube,
allowing users to watch videos as a guest or a registered user, 
so you can upload videos, write comments, see other user's profiles and their videos
and get recommendations for videos based on similar users choices.

The project is compatible for *web* users and *android* users with two different apps that run on the same server.

## Features
- Home screen suggests top 10 most viewed videos and 10 more random videos
- Watch videos
- User registration and sign in
- Upload videos as a registered user
- User profile that shows the videos uploaded by them
- Logged-in users can comment on videos or edit/delete them
- Logged-in users can edit/delete their videos
- Logged-in users can edit/delete its account
- Logged-in users get video recommendations based on their watching history and similar users taste
- Dark mode

## Project's structure
The project consists of the following folders:

1. **server**:
as the name implies, this is the server folder and it consists of some sub-folders:
   1. The main server is a **node.js server** which implements the MVC model (routes, controllers, services, models, middleware)
   2. There is the **cpp server** in a dedicated folder 
   3. There is the **uploads folder** that has the uploaded videos, video's thumbnails and profile pictures


2. **youtube**: this is the client side for a web user, created with react and javascript


3. **android**: this is the client side for an android user, java coded


4. **csv_files**: this folder consists csv files for the database tables of MongoDB


5. **wiki**: in the Wiki pages you will find out set up instructions for the project 
and also walk-through screenshots for using the Web and Android client

**Please note, as the project was built through 4 different exercises:**

1. **main** branch is the branch for exercise 1
2. **part_2_main** is the branch for exercise 2
3. **main_part_3** is the branch for exercise 3
4. **main_part_4** is the branch for exercise 4

## Installation and Using Demonstrations

In the Wiki folder you can find installation and instruction for running the project as web and android clients:

- [Initialization and Server Set Up](wiki/02---Initialization-and-Server-Set-Up.md)
- [Web Client Set Up and Use](wiki/03---Web-Client-Set-Up-and-Use.md)
- [Android Client Set Up and Use](wiki/04---Android-Client-Set-Up-and-Use.md)
