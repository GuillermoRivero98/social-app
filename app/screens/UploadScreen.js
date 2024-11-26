import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { launchCamera, launchImageLibrary } from "@react-native-image-picker/image-picker";
import { uploadImage } from "../services/uploadService";
import AuthContext from "../context/AuthContext";

const UploadScreen = () => {
  const { user } = useContext(AuthContext); // Obtiene el token del usuario
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        setImage(response.assets[0]); // Almacena la imagen seleccionada
      }
    });
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Error", "Por favor selecciona una imagen antes de subirla.");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
    formData.append("caption", caption);

    try {
      const data = await uploadImage(formData, user.token); // Llama al servicio de subida
      Alert.alert("Éxito", "Imagen subida correctamente");
      setImage(null);
      setCaption("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Imagen" onPress={handleSelectImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.imagePreview}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Escribe un pie de foto..."
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Subir Imagen" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
});

export default UploadScreen;
