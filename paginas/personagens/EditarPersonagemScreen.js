import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getFullImageUrl } from "../../utils/utils";
import PersonagemService from "../../services/PersonagemService";
import ImageService from "../../services/ImageService";
import Card from "../../componentes/Card";

const EditarPersonagemScreen = ({ route, navigation }) => {
  const { personagemId } = route.params;

  const [personagem, setPersonagem] = useState({
    id: personagemId,
    nome: "",
    jogadorId: 0,
    campanhaId: 0,
    jogadorNome: "",
    imagePath: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonagem();
  }, [personagemId]);

  const fetchPersonagem = async () => {
    try {
      const response = await PersonagemService.getById(personagemId);
      setPersonagem(response.data);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar personagem.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setPersonagem({ ...personagem, [field]: value });
  };

  const handleUpdatePersonagem = async () => {
    try {
      const updatedPersonagem = {
        id: personagem.id,
        nome: personagem.nome,
        jogadorId: personagem.jogadorId,
        campanhaId: personagem.campanhaId,
        jogadorNome: personagem.jogadorNome,
        imagePath: personagem.imagePath,
      };

      await PersonagemService.update(personagemId, updatedPersonagem);

      if (selectedImage) {
        await uploadImage();
      }

      Alert.alert("Sucesso", "Personagem atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar personagem.");
    }
  };

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("EntityType", "personagem");
    formData.append("EntityId", personagemId);
    formData.append("File", {
      uri: selectedImage,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await ImageService.uploadImage(formData);
      setPersonagem({ ...personagem, imagePath: response.data.imagePath });
      setSelectedImage(null);
    } catch (error) {
      Alert.alert("Erro", "Erro ao fazer upload da imagem.");
    }
  };

  const handleNavigateToFichas = () => {
    navigation.navigate("ListaDeFichas3DeT", { personagemId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/fundo/fundoCampanha.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Card title="Informações do Personagem">
          <Text style={styles.titleInput}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={personagem.nome}
            onChangeText={(value) => handleInputChange("nome", value)}
          />
        </Card>
        <Card title="Imagem do Personagem">
          <View style={styles.imageContainer}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage }
                  : personagem.imagePath
                  ? { uri: getFullImageUrl(personagem.imagePath) }
                  : null
              }
              style={styles.image}
            />
            <Button
              title="Selecionar Imagem"
              color="#8B4513"
              buttonStyle={{
                backgroundColor: "#8B4513",
                borderRadius: 10,
              }}
              titleStyle={{
                fontFamily: "MedievalSharp",
                color: "#FFD700",
              }}
              onPress={handleSelectImage}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.buttonContainer}>
            <Button
              title="Salvar"
              color="#8B4513"
              buttonStyle={{
                backgroundColor: "#8B4513",
                borderRadius: 10,
              }}
              titleStyle={{
                fontFamily: "MedievalSharp",
                color: "#FFD700",
              }}
              onPress={handleUpdatePersonagem}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Ver Fichas 3DeT"
              color="#8B4513"
              buttonStyle={{
                backgroundColor: "#8B4513",
                borderRadius: 10,
                marginTop: 16,
              }}
              titleStyle={{
                fontFamily: "MedievalSharp",
                color: "#FFD700",
              }}
              onPress={handleNavigateToFichas}
            />
          </View>
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleInput: {
    fontFamily: "MedievalSharp",
    fontSize: 24,
    color: "#000",
    fontWeight: "medium",
  },
});

export default EditarPersonagemScreen;
