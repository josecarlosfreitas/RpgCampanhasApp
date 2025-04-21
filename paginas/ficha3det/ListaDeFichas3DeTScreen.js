import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import Ficha3detService from "../../services/Ficha3detService";
import { getFullImageUrl } from "../../utils/utils";

const ListaDeFichas3DeTScreen = ({ route, navigation }) => {
  const { personagemId } = route.params;

  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFichas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await Ficha3detService.getByPersonagemId(personagemId);
        setFichas(response.data);
      } catch (err) {
        setError("Erro ao carregar fichas.");
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, [personagemId]);

  const handleEditFicha = (fichaId) => {
    navigation.navigate("EditarFicha3DeT", { fichaId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando fichas...</Text>
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
      <Text style={styles.title}>Fichas 3DeT</Text>
      <FlatList
        data={fichas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleEditFicha(item.id)}
            style={styles.listItem}
          >
            <Image
              source={{
                uri: getFullImageUrl(item.imagePath),
              }}
              style={styles.image}
            />
            <Text style={styles.listItemText}>{item.nome}</Text>
          </TouchableOpacity>
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

export default ListaDeFichas3DeTScreen;
