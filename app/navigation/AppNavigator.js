import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../screens/Feed"; // Ajustar rutas según tu estructura
import UploadScreen from "../screens/UploadScreen";
import ProfileScreen from "../screens/Profile";
import LoginScreen from "../screens/Login";
import AuthContext from "../context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tabs para usuarios autenticados
const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Subir Imagen" component={UploadScreen} />
    <Tab.Screen name="Perfil" component={ProfileScreen} />
  </Tab.Navigator>
);

// Configuración general
const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? (
        <AppTabs /> // Tabs si el usuario está autenticado
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} /> // Pantalla de Login
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
