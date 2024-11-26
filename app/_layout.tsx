import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from "./screens/LoginScreen"
import FeedScreen from "./screens/FeedScreen"
import ProfileScreen from "./screens/ProfileScreen"
import UploadScreen from "./screens/UploadScreen"

const Stack = createStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="feed" component={FeedScreen} options={{ title: 'Feed' }} />
        <Stack.Screen name="profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
        <Stack.Screen name="upload" component={UploadScreen} options={{ title: 'Subir Imagen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
