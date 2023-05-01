import React, { useContext } from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../context/authContext/AuthContext';
import { useForm } from '../hooks/useForm';
import { ReviewsContext } from '../context/reviewsContext/ReviewsContext';
import { Background } from '../components/Background';

export const FormScreen = () => {
  const { logOut } = useContext(AuthContext);
  const { addReview } = useContext(ReviewsContext)
  const { title, description, qualification, onChange, onResetForm } = useForm({
    title: '',
    description: '',
    qualification: ''
  });

 

  const onAddReview = () => {
    addReview(title,description,qualification);
    Keyboard.dismiss();
  }
  return (
    <View style={styles.container}>
      <Background />
          <View style={styles.backButton}>
          <TouchableOpacity 
            onPress={logOut}
            style={styles.button}
          >
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.label}>Movie title:</Text>
          <TextInput 
            placeholder='Title'
            style={styles.textInput}
            selectionColor='white'
            onSubmitEditing={onAddReview}
            autoCapitalize='words'
            autoCorrect={false}
            value = {title }
            onChangeText={ value => onChange(value, 'title') }
          />
           <Text style={styles.label}>Your opinion:</Text>
          <TextInput 
            placeholder=''
            style={styles.textArea}
            selectionColor='white'
            onSubmitEditing={onAddReview}
            autoCapitalize='words'
            value = {description }
            onChangeText={ value => onChange(value, 'description') }
          />
           <Text style={styles.label}>Qualification:</Text>
          <TextInput 
            placeholder='Qualification'
            style={styles.textInput}
            selectionColor='white'
            onSubmitEditing={onAddReview}
            value = {qualification }
            onChangeText={ value => onChange(value, 'qualification') }
          />

          <TouchableOpacity style={styles.buttonContainer}
            onPress={onAddReview}
          >
            <Text style={styles.label}>Sent review</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      position:'absolute',
      zIndex: 999,
      elevation: 9,
      top: 40,
      right: 10
    },
    button: {
      borderWidth: 2,
      borderColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 100
    },
    containerForm: {
      borderWidth: 1,
      borderColor: 'white',
      width: 300,
      padding: 20,
      borderRadius: 10
    },
    label: {
      fontSize: 18,
      marginTop: 10,
      color: 'white'
    },
    textInput: {
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      borderColor: 'rgba(0,0,0,0.2)',
      height: 45,
      marginTop: 5,
      color: 'white'
    },
    textArea: {
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      borderColor: 'rgba(0,0,0,0.2)',
      height: 90,
      marginTop: 5,
      color: 'white'
    },
    buttonContainer: {
      borderWidth: 1,
      borderColor: 'white',
      marginTop: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      alignSelf: 'center'
    }
});
