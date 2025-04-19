import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import PersonagemService from "../../services/PersonagemService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const ListaDePersonagensScreen = ({ route }) => {
  const { campanhaId } = route.params;

  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonagens = async () => {
      setLoading(true);
      setError(null);
      try {
        const usuario = await AsyncStorage.getItem("usuario");
        if (!usuario) {
          throw new Error("Usuário não encontrado no AsyncStorage.");
        }
        const { id: usuarioId } = JSON.parse(usuario);
        const response = await PersonagemService.getByCampanhaIdEJogadorId(
          campanhaId,
          usuarioId
        );
        setPersonagens(response.data);
      } catch (err) {
        setError("Erro ao carregar personagens.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonagens();
  }, [campanhaId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando personagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personagens da Campanha</Text>
      <FlatList
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{
                uri: `${Constants.expoConfig?.extra?.REACT_APP_API_URL.replace(
                  "/api",
                  ""
                )}/${item.imagePath}`,
              }}
              style={styles.image}
            />
            <Text style={styles.listItemText}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  listItemText: {
    fontSize: 18,
  },
});

export default ListaDePersonagensScreen;
