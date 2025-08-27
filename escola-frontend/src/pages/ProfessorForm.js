import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { professoresAPI } from '../services/apiService';

const ProfessorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    materia: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchProfessor();
    }
  }, [id, isEditing]);

  const fetchProfessor = async () => {
    try {
      setLoading(true);
      const professor = await professoresAPI.getById(id);
      setFormData({
        nome: professor.nome,
        dataNascimento: professor.dataNascimento.split('T')[0],
        materia: professor.materia
      });
    } catch (error) {
      setError('Erro ao carregar professor');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validação básica
      if (!formData.nome.trim()) {
        throw new Error('Nome é obrigatório');
      }
      if (!formData.dataNascimento) {
        throw new Error('Data de nascimento é obrigatória');
      }
      if (!formData.materia.trim()) {
        throw new Error('Matéria é obrigatória');
      }

      // Preparar dados para envio
      const professorData = {
        nome: formData.nome.trim(),
        dataNascimento: formData.dataNascimento, // Enviar como string no formato YYYY-MM-DD
        materia: formData.materia.trim()
      };

      console.log('Enviando dados:', professorData); // Para debug

      if (isEditing) {
        await professoresAPI.update(id, professorData);
        alert('Professor atualizado com sucesso!');
      } else {
        await professoresAPI.create(professorData);
        alert('Professor criado com sucesso!');
      }
      
      navigate('/professores');
    } catch (error) {
      console.error('Erro completo:', error);
      setError(error.message || 'Erro ao salvar professor');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/professores');
  };

  if (loading && isEditing) return <div className="loading">Carregando...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{isEditing ? 'Editar Professor' : 'Novo Professor'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="nome">Nome *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome do professor"
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento *</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="materia">Matéria *</label>
          <input
            type="text"
            id="materia"
            name="materia"
            value={formData.materia}
            onChange={handleChange}
            required
            placeholder="Digite a matéria que o professor ensina"
            maxLength={100}
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessorForm;