import React, { useEffect, useRef, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera} from 'react-native-vision-camera';
import ErrorModal from '../sharedComponents/ErrorBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecordScreen = () => {
   
  const cameraRef = useRef(null);
  const [imageFile,setImageFile] = useState(null)
  const [AvailableCameras,setAvailableCameras] = useState(null)
  const [selectedCamera,setSelectedCamera] = useState(null)
  const [hasPermission, setPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorType, setErrorType] = useState('');
  
  
  const handleCamera = () => {
    if(hasPermission){
      selectedCamera.id==1? selectCamera('external',AvailableCameras):selectCamera('front',AvailableCameras)
    }
    else{
      getPermission();
    }
  };
  
  const takePicture = async () => {
    if(imageFile!=null){
      setImageFile(null);
    }
    if(hasPermission){
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePhoto();
          saveImagePathLocally(photo.path);

        } catch (error) {
          setErrorMessage('Failed to capture the photo.');
          setErrorType('other');
          setModalVisible(true);
        }
      }
    }
      else{
        getPermission();
      }
   
  };

const saveImagePathLocally = async (imagePath) => {
  try {
    setImageFile(imagePath)
    await AsyncStorage.setItem('savedImagePath', imagePath);
    
  } catch (error) {
    console.error('Error saving image path:', error);
  }
};


  const startRecording = async () => {
    if(hasPermission){
      if (cameraRef.current && !isRecording) {
        try {
          setIsRecording(true);
          const video = cameraRef.current.startRecording({
            onRecordingError: (error) => console.error(error)
          })
        } catch (error) {
          setIsRecording(false);
          setErrorMessage('Failed to start recording.');
          setErrorType('other');
          setModalVisible(true);
        }
      }
    } else {
        getPermission();
    }
    
  }; 
  
  const stopRecording = async () => {
    if(hasPermission){
      if (cameraRef.current && isRecording) {
        try {
          const video = await cameraRef.current.stopRecording();
          setIsRecording(false);
        } catch (error) {
          console.error('Error stopping video recording:', error);
          setIsRecording(false);
          setErrorMessage('Failed to stop recording.');
          setErrorType('other');
          setModalVisible(true);
        }
      }
    }
      else{
        getPermission();
      }
    
  };
  
  
  const selectCamera = async (cameraType,devices) => {
    let selectedDevice;
    if (cameraType === 'front') {
      try {        
        selectedDevice = devices.find((device) => device.id==1);
        setSelectedCamera(selectedDevice);
        selectedDevice =null; 
      } catch (error) {
      }
    } else if (cameraType === 'external') {
      try {
        selectedDevice = devices.find((device) => device.name.includes('external') || device.name.includes('webcam'));
        if (selectedDevice!=undefined) {
          setSelectedCamera(selectedDevice)
          selectedDevice =null; 
        }
        else{
        setErrorType('other');
        setErrorMessage("External Camera Access Failed")
        setModalVisible(true);
        }
          
      } catch (error) {
        selectedDevice = devices.find((device) => device.id==1);
        setSelectedCamera(selectedDevice);
        selectedDevice =null; 
      }
    } 
    else{ 
        setSelectedCamera(null)
    }
  };
  
  const getPermission = async () => {   
    const cameraPermission = await Camera.requestCameraPermission();
    setPermission(cameraPermission === 'granted');
    const CameraDevices = Camera.getAvailableCameraDevices();
    setAvailableCameras(CameraDevices);
    if ( CameraDevices.length === 0) {
      setErrorType('noDevice');
      setModalVisible(true);
    }
    else{
      if(cameraPermission === 'granted' && CameraDevices.length > 0){
        selectCamera('front',CameraDevices);
      }
      else if (cameraPermission != 'granted') {
        setErrorType('permission');
        setModalVisible(true);
      }
    }
    return CameraDevices;
  };

  useEffect(() => {
    
    getPermission();
    
  }, []);

      return <ImageBackground source={require('../assets/second.png')} style={styles.image} >
        <View style={styles.container}>
          {imageFile?
          <View style={styles.videoContainer}>
            <Image source={{ uri: `file://${imageFile}` }} style={styles.image}/>
          </View>:<>
          {hasPermission && selectedCamera !=null ?
            <View style={styles.videoContainer}>    
                <Camera
                  ref={cameraRef}
                  style={styles.camera}
                  device={selectedCamera}
                  isActive={true}
                  photo={true}
                  video={true}
                  audio={false}
                />
            </View>
            :
            <View style={styles.videoContainer}>
              <Image source={require('../assets/unsplashPic.jpg')} style={styles.image}/>
            </View>
          }
          </>
        }
            
          <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btn} onPress={isRecording? stopRecording:takePicture} onLongPress={isRecording? stopRecording:startRecording }>

                  {isRecording?
                    <Icon name="stop" size={24} color="white" style={{paddingHorizontal:3}}/>:
                    <>
                      { imageFile ===null? <Icon name="camera" size={24} color="white" />:<Icon name="close" size={24} color="white" style={{paddingHorizontal:3}}/>}
                    </>
                  }

                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={handleCamera}>
                  <Text style={styles.btnText}>Swith Camera</Text>
                </TouchableOpacity>
          </View>
          {modalVisible?
            <ErrorModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              errorType={errorType}
              error={errorMessage}
            />:<></>
          }
        </View>
    </ImageBackground>
    
    }
    const styles = StyleSheet.create({
      backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical:50
      },
      btnRow: {
        flexDirection:'row',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30
      },
      image: {
        flex: 1,
        width:"100%",
        height:"100%",
        resizeMode: 'cover', 
      },
      camera: {
        width:"100%",
        height:"100%",
      },
      videoContainer:{
        backgroundColor:"black",
        borderRadius:30,
        width:"90%",
        height:"90%",
        overflow:'hidden' ,
        resizeMode: 'cover', 
      },
      btn: {
        width: 'auto',
        backgroundColor: '#d21a32',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical:12,

        marginHorizontal:10
      },
      btnText: {
        fontSize:18,
        fontWeight:"bold",
        color: 'white',
    
      },
    });
    export default RecordScreen;