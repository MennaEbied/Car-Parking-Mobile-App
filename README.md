# Car Parking Mobile App 🚗
A mobile application built with React Native, Expo, and Firebase for managing car parking slots and user authentication.


## ✨ Features
**User Authentication**
- **Sign up, log in, and log out using Firebase Authentication.**
- **Secure email and password sign-in support.**

**Parking Slot Management**
- **View a list of available parking slots.**
- **Reserve a specific parking slot for a chosen time.**

**Real-Time Updates**
- **Leverages Firebase to provide real-time updates on parking slot availability.**
  

## 🛠️ Technologies Used
- **Frontend**: React Native & Expo
- **Backend**: Firebase Authentication & Node.js
- **Styling**: React Native Stylesheet
  

## 🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites 📋
Before you begin, ensure you have the following installed:

- **Node.js (v18 or higher is recommended)**
- **Expo CLI**
- **A free Firebase account**

### Setup Instructions
1. **Clone the repository:**

```git clone https://github.com/MennaEbied/Car-Parking-Mobile-App.git```

```cd Car-Parking-Mobile-App```


2. **Install project dependencies:**
   
```npm install```

4. **Configure Firebase:**

- **Go to the Firebase Console and create a new project.**
- **In your new project, navigate to Project Settings > General.**
- **Register a new "Web app" and copy the firebaseConfig object.**
- **Create a new file named firebaseConfig.ts in the root of your project and paste your configuration into it. The file should look like this:**
```
 // firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## Start the development server:

```npx expo start```
- **Scan the QR code with the Expo Go app on your phone to run the application.**
