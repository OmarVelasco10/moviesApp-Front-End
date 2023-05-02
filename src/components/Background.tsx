import React from 'react';
import { StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';



interface Props {
    children: JSX.Element | JSX.Element[]
}

export const Background = () => {


 

  return (
    
        <LinearGradient
            colors={['#0CABBC','#4878C0', '#9535c0']}
            style={{ flex:1,...StyleSheet.absoluteFillObject}}
            start={{x: 0.1, y: 0.1}}
            end={{x:0.5,y:0.7}}
        />
   
  )
}