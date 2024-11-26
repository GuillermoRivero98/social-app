import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const FeedScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/images");
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        alert("Error al cargar el feed.");
      }
    };
    fetchImages();
  }, []);

  const handleLike = async (imageId) => {
    try {
      await axios.post(`http://localhost:3001/api/images/${imageId}/like`, {}, {
        headers: { Authorization: `Bearer ${user}` },
      });

      // Actualiza el estado local para reflejar el "like"
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === imageId ? { ...img, likes: img.likes + 1 } : img
        )
      );
    } catch (error) {
      alert("Error al dar me gusta.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text style={styles.likeButton}>❤️ Me Gusta</Text>
        </TouchableOpacity>
        <Text style={styles.likesCount}>{item.likes} me gusta(s)</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { marginBottom: 15, padding: 10, borderRadius: 10, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 10 },
  caption: { marginTop: 10, fontSize: 16, color: "#333" },
  likeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  likeButton: { fontSize: 16, color: "red" },
  likesCount: { fontSize: 16, color: "#333" },
});

export default FeedScreen;
