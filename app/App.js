import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./app/navigation/AppNavigator"; // Ruta corregida
import { AuthProvider } from "./app/context/AuthContext"; // Ruta para el AuthContext
import { getToken } from "./app/services/authService"; // Ruta del servicio de autenticación

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken(); // Obtiene el token almacenado (si existe)
        console.log("Token actual:", token); // Para depuración
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el token:", error);
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
