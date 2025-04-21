import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ficha3detService from "../../services/Ficha3detService";
import { getFullImageUrl } from "../../utils/utils";

const EditarFicha3DeTScreen = ({ route, navigation }) => {
  const { fichaId } = route.params;

  const [ficha, setFicha] = useState({
    id: fichaId,
    nome: "",
    forca: 0,
    habilidade: 0,
    resistencia: 0,
    armadura: 0,
    poderDeFogo: 0,
    pontosDeVida: 0,
    pontosDeMagia: 0,
    vantagens: "",
    desvantagens: "",
    historia: "",
    tiposDeDano: "",
    dinheiroEItens: "",
    magiasConhecidas: "",
    notas: "",
    pontosDeExperiencia: 0,
    pontos: 0,
    imagePath: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFicha();
  }, [fichaId]);

  const fetchFicha = async () => {
    try {
      const response = await Ficha3detService.getById(fichaId);
      setFicha(response.data); // Preenche os campos com os dados da ficha
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar ficha.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFicha({ ...ficha, [field]: value });
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

  const handleSaveFicha = async () => {
    try {
      const updatedFicha = {
        ...ficha,
        imagePath: selectedImage || ficha.imagePath,
      };

      await Ficha3detService.update(fichaId, updatedFicha);
      Alert.alert("Sucesso", "Ficha atualizada com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar ficha.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando ficha...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Ficha 3DeT</Text>

      {/* Seção: Atributos Básicos */}
      <Text style={styles.sectionTitle}>Atributos Básicos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={ficha.nome}
        onChangeText={(value) => handleInputChange("nome", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Força"
        keyboardType="numeric"
        value={ficha.forca.toString()}
        onChangeText={(value) =>
          handleInputChange("forca", parseInt(value) || 0)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Habilidade"
        keyboardType="numeric"
        value={ficha.habilidade.toString()}
        onChangeText={(value) =>
          handleInputChange("habilidade", parseInt(value) || 0)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Resistência"
        keyboardType="numeric"
        value={ficha.resistencia.toString()}
        onChangeText={(value) =>
          handleInputChange("resistencia", parseInt(value) || 0)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Armadura"
        keyboardType="numeric"
        value={ficha.armadura.toString()}
        onChangeText={(value) =>
          handleInputChange("armadura", parseInt(value) || 0)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Poder de Fogo"
        keyboardType="numeric"
        value={ficha.poderDeFogo.toString()}
        onChangeText={(value) =>
          handleInputChange("poderDeFogo", parseInt(value) || 0)
        }
      />

      {/* Seção: Informações Adicionais */}
      <Text style={styles.sectionTitle}>Informações Adicionais</Text>
      <TextInput
        style={styles.input}
        placeholder="Vantagens"
        value={ficha.vantagens}
        onChangeText={(value) => handleInputChange("vantagens", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Desvantagens"
        value={ficha.desvantagens}
        onChangeText={(value) => handleInputChange("desvantagens", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="História"
        value={ficha.historia}
        onChangeText={(value) => handleInputChange("historia", value)}
      />

      {/* Seção: Imagem */}
      <Text style={styles.sectionTitle}>Imagem</Text>
      <Image
        source={
          selectedImage
            ? { uri: selectedImage }
            : ficha.imagePath
            ? { uri: getFullImageUrl(ficha.imagePath) }
            : null
        }
        style={styles.image}
      />
      <Button title="Selecionar Imagem" onPress={handleSelectImage} />

      {/* Botão de Salvar */}
      <Button title="Salvar" onPress={handleSaveFicha} />
    </ScrollView>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditarFicha3DeTScreen;
