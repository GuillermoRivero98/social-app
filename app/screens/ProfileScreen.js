import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:3001/api/user/profile", {
        username,
        profilePicture,
      }, {
        headers: { Authorization: `Bearer ${user}` },
      });
      alert("Perfil actualizado con éxito.");
    } catch (error) {
      alert("Error al actualizar el perfil.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la foto de perfil"
        value={profilePicture}
        onChangeText={setProfilePicture}
      />
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.imagePreview} />
      ) : null}
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  imagePreview: { width: 100, height: 100, marginVertical: 10, borderRadius: 50 },
});

export default ProfileScreen;
