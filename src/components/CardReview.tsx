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
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Text>{qualification}</Text>
        <Text> -{username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        borderColor: 'red',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10
    }
});
