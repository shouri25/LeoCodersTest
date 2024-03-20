import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStack';
import Splash from '../screens/Splash';
import Second from '../screens/Second';
import Third from '../screens/Third';
import Signup from '../screens/Signup';

const Navigation = ({}) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name={'SPLASH'}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SECOND'}
        component={Second}
      />
      <Stack.Screen
        name={'THIRD'}
        component={Third}
      />
      <Stack.Screen
        name={'SIGNUP'}
        component={Signup}
        options={{
          headerTitle: 'Sign Up',
          headerTitleAlign:'center'
        }}
      />
    </Stack.Navigator>
  );
};
export default Navigation;
