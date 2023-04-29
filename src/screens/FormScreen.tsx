import React, { useContext } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/authContext/AuthContext'
import Icon from 'react-native-vector-icons/Ionicons';

export const FormScreen = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
          <View style={styles.backButton}>
          <TouchableOpacity 
            onPress={logOut}
            style={styles.button}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      borderColor: 'red',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 100
    }
});
