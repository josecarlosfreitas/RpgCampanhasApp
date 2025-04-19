import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.REACT_APP_API_URL;

const login = async (email, senha) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/login`, {
      params: { email, senha },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const UsuarioService = {
  login,
};

export default UsuarioService;
