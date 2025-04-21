import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    MedievalSharp: require("./assets/fonts/MedievalSharp-Regular.ttf"),
    FancyQuisley: require("./assets/fonts/Fancy-Quisley.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return <AppNavigator />;
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
