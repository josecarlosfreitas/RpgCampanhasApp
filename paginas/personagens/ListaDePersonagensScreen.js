import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ListaDePersonagensScreen = ({ route }) => {
  const { campanhaId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personagens da Campanha {campanhaId}</Text>
      {/* Aqui você irá listar os personagens da campanha com o ID */}
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
});

export default ListaDePersonagensScreen;
