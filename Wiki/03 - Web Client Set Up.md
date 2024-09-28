# Web Client - Set Up

## Installation

To run the project as a web client, follow these steps:

### Open your code editor/IDE:

Assuming you opened the project in your code editor/IDE under Youtube folder, follow the next steps:

**Install dependencies:**
```bash
cd youtube
npm install react
npm run build
```

Assuming the server is already runnimg, the application should now be running on [http://localhost:8080](http://localhost:8080).
Please note that the JWT you get when log-in to your account expires within 1 hour. After that time, you will not be able to upload, edit or delete anything. You can sign-out and then sign-in again and you will be able to perform these actions.
