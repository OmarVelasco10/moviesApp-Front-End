import React from 'react';
import { Image, View } from 'react-native';

export const Logo = () => {
  return (
    <View 
        style={{
            alignItems: 'center',
            width: 150,
            height: 180
        }}
    >
        <Image 
            source={ require('../assets/user-removebg-preview.png')}
            style={{
                width: 150,
                height: 180
            }}
        />
    </View>
  )
}
