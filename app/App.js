import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./navigation/AppNavigator"; // Ruta ajustada
import { AuthProvider } from "./context/AuthContext"; // Contexto para autenticación

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => setLoading(false), 1000);
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
