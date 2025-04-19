import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CampanhaService from "../../services/CampanhaService";

const ListaDeCampanhasScreen = ({ route }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const { usuarioId } = route.params;

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CampanhaService.getByUsuarioId(usuarioId);
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Erro ao buscar campanhas");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCampaignPress = (campanhaId) => {
    navigation.navigate("ListaDePersonagens", { campanhaId: campanhaId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando campanhas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Campanhas</Text>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCampaignPress(item.id)}
            style={styles.listItem}
          >
            <Text style={styles.listItemTitle}>{item.nome}</Text>
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
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
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
});

export default ListaDeCampanhasScreen;
