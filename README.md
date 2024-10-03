This is a [**React Native**](https://reactnative.dev) project.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.


>**Objective**:
This project demonstrates how to connect an external USB webcam in a React Native app. The app allows you to:
Detect and connect to an external webcam.
Display the webcam’s live video feed within the app.
Having controls for starting/stopping the feed, switching cameras, and capturing images.

>**Features**:
Live Video Feed: Displays a live video stream from a connected external webcam.
Controls: Start/Stop the video feed.
Switch between the device’s front camera and the external webcam.
Capture an image and cache it locally.
Basic Error Handling: Manage scenarios where the webcam is disconnected.

>** Requirements**:
React Native CLI 
Android (iOS support optional)
Node.js installed on your machine
Android Studio and Android device/emulator for testing

> **Setup Instructions**:

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/connect-external-webcam-react-native.git
cd connect-external-webcam-react-native
```
Install Dependencies Ensure you have Node.js installed, then run:
```bash
npm install
```

## Step 2: Run the Application To start the app on Android, use:
```bash
npx react-native run-android
```

Make sure your Android device is connected or an emulator is running.

Testing Webcam Features

Connect your external USB camera.
Ensure the app detects the webcam and displays the live video feed.
Test switching between the external webcam and the front camera, starting/stopping the feed, and capturing images.

Usage
Start Video Feed: Open the app and longPress the "Camera" button to display the live feed.
Capture Image: Tap "Camera" button to take a photo and save it locally.
Switch Camera: Use the "Switch Camera" button to toggle between the front camera and the external webcam.

Error Handling
In case the external webcam is disconnected, an alert will notify the user to reconnect or use the default camera.

## Congratulations!:

You've successfully run this React Native App. :partying_face:
