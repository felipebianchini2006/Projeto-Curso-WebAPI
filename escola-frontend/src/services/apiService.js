import axios from 'axios';

const API_BASE_URL = 'http://localhost:5098/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para debug (remover depois)
api.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.log('Response Error:', error.response);
    return Promise.reject(error);
  }
);

// Serviços para Professores
export const professoresAPI = {
  // Buscar todos os professores
  getAll: async () => {
    try {
      const response = await api.get('/Professores');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      throw error;
    }
  },

  // Buscar professor por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/Professores/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar professor:', error);
      throw error;
    }
  },

  // Criar novo professor
  create: async (professorData) => {
    try {
      // Formatação da data - método mais simples e confiável
      const dataFormatted = {
        ...professorData,
        dataNascimento: professorData.dataNascimento // Enviar apenas a string da data YYYY-MM-DD
      };
      
      console.log('Dados sendo enviados:', dataFormatted);
      
      const response = await api.post('/Professores', dataFormatted);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  // Atualizar professor
  update: async (id, professorData) => {
    try {
      // Formatação da data - método mais simples e confiável
      const dataFormatted = {
        ...professorData,
        dataNascimento: professorData.dataNascimento // Enviar apenas a string da data YYYY-MM-DD
      };
      
      console.log('Dados sendo enviados para update:', dataFormatted);
      
      const response = await api.put(`/Professores/${id}`, dataFormatted);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  // Deletar professor
  delete: async (id) => {
    try {
      await api.delete(`/Professores/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao deletar professor:', error);
      throw error;
    }
  }
};

// Serviços para Alunos
export const alunosAPI = {
  // Buscar todos os alunos
  getAll: async () => {
    try {
      const response = await api.get('/Alunos');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  },

  // Buscar aluno por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/Alunos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      throw error;
    }
  },

  // Criar novo aluno
  create: async (alunoData) => {
    try {
      // Formatação da data - método mais simples e confiável
      const dataFormatted = {
        ...alunoData,
        dataNascimento: alunoData.dataNascimento // Enviar apenas a string da data YYYY-MM-DD
      };
      
      console.log('Dados do aluno sendo enviados:', dataFormatted);
      
      const response = await api.post('/Alunos', dataFormatted);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  // Atualizar aluno
  update: async (id, alunoData) => {
    try {
      // Formatação da data - método mais simples e confiável
      const dataFormatted = {
        ...alunoData,
        dataNascimento: alunoData.dataNascimento // Enviar apenas a string da data YYYY-MM-DD
      };
      
      console.log('Dados do aluno sendo enviados para update:', dataFormatted);
      
      const response = await api.put(`/Alunos/${id}`, dataFormatted);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  // Deletar aluno
  delete: async (id) => {
    try {
      await api.delete(`/Alunos/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      throw error;
    }
  }
};

export default api;