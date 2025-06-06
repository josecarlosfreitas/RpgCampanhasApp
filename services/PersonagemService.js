import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/personagem`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/personagem/${id}`);
};

const getByJogadorId = (id) => {
  return axios.get(`${API_URL}/personagem/jogador/${id}`);
};

const getByCampanhaIdEJogadorId = (campanhaId, jogadorId) => {
  return axios.get(
    `${API_URL}/personagem/campanha/${campanhaId}/jogador/${jogadorId}`
  );
};

const update = (id, personagem) => {
  return axios.put(`${API_URL}/personagem/${id}`, {
    ...personagem,
    jogadorNome: "",
  });
};

const PersonagemService = {
  getAll,
  getById,
  getByJogadorId,
  getByCampanhaIdEJogadorId,
  update,
};

export default PersonagemService;
