import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/campanha`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/campanha/${id}`);
};

const getByUsuarioId = (id) => {
  return axios.get(`${API_URL}/campanha/usuario/${id}`);
};

const CampanhaService = {
  getAll,
  getById,
  getByUsuarioId,
};

export default CampanhaService;
