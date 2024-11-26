import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../screens/Feed";
import UploadScreen from "../screens/UploadScreen";
import ProfileScreen from "../screens/Profile";
import LoginScreen from "../screens/Login";
import AuthContext from "../context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Subir Imagen" component={UploadScreen} />
    <Tab.Screen name="Perfil" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? (
        <AppTabs /> // Si está autenticado, muestra las tabs
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} /> // Pantalla de login
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
