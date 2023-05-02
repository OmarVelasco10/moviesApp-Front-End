import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Tabs } from './Tabs';
import { AuthNavigation } from './AuthNavigation';
import { AuthContext } from '../context/authContext/AuthContext';



const Stack = createStackNavigator();

export const Navigator = () => {
    const {status} = useContext(AuthContext);
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle:{
                // backgroundColor: 'white',
            }
        }}
    >
        {
            status !== 'authenticated' ? (
                <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
            )
            : (
                <Stack.Screen name="Tabs" component={Tabs} />
            )
        }
 
      
    </Stack.Navigator>
  );
}