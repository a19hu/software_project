import * as React from 'react';
import { Camera } from 'expo-camera';
import { Text, View, Button, Platform } from 'react-native';
import * as FaceDetector from 'expo-face-detector';

const FaceDetection = () => (
    <>
    <Text>kldjf</Text>
    <Camera
      // other props
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
        minDetectionInterval: 100,
        tracking: true,
      }}
    />
    </>
);

const handleFacesDetected = ({ faces }) => {
  console.log(faces);
};

export default FaceDetection;
