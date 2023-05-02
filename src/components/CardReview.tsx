import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    title: string,
    description: string,
    qualification: string,
    username: string
}

export const CardReview = ({title, description, qualification, username}: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}> Title: <Text style={styles.subText}>{title}</Text></Text>
        <Text style={styles.text}>Opinion: <Text style={styles.subText}>{description}</Text></Text>
        <Text style={styles.text}>Qualification: <Text style={styles.subText}>{qualification}</Text></Text>
        <Text style={styles.text}> Username - <Text style={styles.subText}>{username}</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        borderColor: 'white',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
    },
    text: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: 5
    },
    subText: {
      fontSize: 15,
      color: 'white',
    }
});
