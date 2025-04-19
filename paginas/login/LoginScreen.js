import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuarioService from "../../services/UsuarioService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const usuario = await AsyncStorage.getItem("usuario");
        if (usuario) {
          const parsedUsuario = JSON.parse(usuario);
          navigation.navigate("ListaDeCampanhas", {
            usuarioId: parsedUsuario.id,
          });
        }
      } catch (error) {
        console.error("Erro ao verificar usuário no AsyncStorage:", error);
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      const usuario = await UsuarioService.login(email, senha);

      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

      navigation.navigate("ListaDeCampanhas", { usuarioId: usuario.id });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.status === 404) {
        Alert.alert("Erro de Login", "Usuário ou senha inválidos.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
});

export default LoginScreen;
