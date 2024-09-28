# Project's Initialization and Server Set Up

## Installation

To get started with the project, follow these steps:

### Clone the repository

Get to your desired folder and clone the repository with the following command:

```bash
git clone https://github.com/guybaruch1/Youtube
cd Youtube
git checkout main_part_4
git pull origin main_part_4
```

### Set Up MongoDB to Work with Our App

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

### Set Up Node.js Server

1. **Open your code editor/IDE**


2. **Create a configuration file** - under server/config, create a file called ".env.local" which consist the following lines:

```
CONNECTION_STRING = "mongodb://localhost:YOUR_PORT_OF_CHOICE"
PORT = 8080
SECRET_KEY=your_secret_key
```

Make sure port is ```8080``` and SECRET_KEY is ```your_secret_key``` as defined above. 
However, you can choose your own MongoDB port.

3. **Run the server** - start the development server using:

```bash
cd Youtube/server
npm install custom-env express body-parser cors mongoose path
npm start
```
### Set Up CPP Server

1. Open your linux based OS on (we used WSL on windows)
2. Navigate to ```Youtube/server/cpp_server```
3. Use the MakeFile to compile the cpp server files and run the executable:
```bash 
make
./cpp_server
```

Please note that in order to support the Android client, the CPP server runs on port ```5555```

### Proceed to Install and Run Web or Android Clients

At this point, when both the Node.js and CPP server are running, 
you will be able to run the web and android clients.

- [Web Client Set Up and Use](wiki/03---Web-Client-Set-Up-and-Use.md)
- [Android Client Set Up and Use](wiki/04---Android-Client-Set-Up-and-Use.md)


