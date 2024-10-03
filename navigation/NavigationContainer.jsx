import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash';
import HomeScreen from '../screens/home';
import Routes from './Routes';
import RecordScreen from '../screens/RecordScreen';
import { navigationRef } from './RootNavigation';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash"
       screenOptions={{
        gestureEnabled: true,
        headerShown: true,
        animationTypeForReplace: 'push',
      }}
      >

        <Stack.Screen 
          name={Routes.Splash} 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name={Routes.Home} 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name={Routes.Record} 
          component={RecordScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;