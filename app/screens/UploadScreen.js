import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { launchCamera } from "react-native-image-picker";
import axios from "axios";

const UploadScreen = () => {
  const [image, setImage] = useState(null);

  const takePhoto = () => {
    launchCamera({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        setImage(response.assets[0]);
      }
    });
  };

  const uploadPhoto = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("photo", {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });

    try {
      const response = await axios.post("http://localhost:3001/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Imagen subida con éxito");
    } catch (error) {
      alert("Error al subir la imagen");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Tomar Foto" onPress={takePhoto} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, margin: 10 }} />}
      <Button title="Subir Foto" onPress={uploadPhoto} />
    </View>
  );
};

export default UploadScreen;
