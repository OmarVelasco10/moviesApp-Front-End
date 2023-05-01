import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    title: string,
    description: string,
    qualification: string,
    username: string
}

export const CardReview = ({title, description, qualification, username}: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{qualification}</Text>
        <Text style={styles.text}> -{username}</Text>
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
        marginVertical: 10
    },
    text: {
      fontSize: 15,
      color: 'white'
    }
});
