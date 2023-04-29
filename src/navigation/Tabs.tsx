import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MovieNavigation } from './MovieNavigation';
import { ListReviewsScreen } from '../screens/ListReviewsScreen';
import { FormScreen } from '../screens/FormScreen';
import { Platform } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
// import { GradientContext } from '../context/GradientContext';


const Tab = createBottomTabNavigator();

export const Tabs = () => {
    // const { colors } = useContext(GradientContext);
    // console.log(colors.primary);
  return (
    <Tab.Navigator
    sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5656D6',
        tabBarLabelStyle: {
          marginBottom: (Platform.OS === 'ios') ? 10 : 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 0,
          elevation: 0,
          height: (Platform.OS === 'ios') ? 80 : 60,
        }
      }}
    >
      <Tab.Screen name="MoviesScreen" component={MovieNavigation} 
      options={{
        tabBarLabel: 'Movies',
        tabBarIcon: ( {color}) => <Icon color={color} size={25} name="list-outline"/>
      }}
      />
      <Tab.Screen 
      name="ListReviewsScreen" 
      component={ListReviewsScreen} 
      options={{
        tabBarLabel: 'Reviews',
        tabBarIcon: ( {color}) => <Icon color={color} size={25} name="checkmark-done-outline"/>
      }}
      />
      <Tab.Screen name="FormScreen" component={FormScreen} 
      options={{
        tabBarLabel: 'Give your opinon',
        tabBarIcon: ( {color}) => <Icon color={color} size={25} name="chatbox-ellipses-outline"/>
      }}
      />
    </Tab.Navigator>
  );
}