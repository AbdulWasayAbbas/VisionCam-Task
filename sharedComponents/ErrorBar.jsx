import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const ErrorModal = ({ isVisible, onClose, errorType,error }) => {
  let errorMessage = '';
  let errorTitle = '';

  switch (errorType) {
    case 'permission':
      errorTitle = 'Permission Required';
      errorMessage = 'Please grant camera access to continue.';
      break;
    case 'noDevice':
      errorTitle = 'No Camera Detected';
      errorMessage = 'No camera device found. Please connect a camera.';
      break;
      
    case 'other':
      errorTitle = 'Error';
      errorMessage = error?? 'An unexpected error occurred.';
      break;

    default:
      errorTitle = 'Error';
      errorMessage = 'An unexpected error occurred.';
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorTitle}>{errorTitle}</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <CustomButton title='Close' color={"red"} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: 'grey',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ErrorModal;
