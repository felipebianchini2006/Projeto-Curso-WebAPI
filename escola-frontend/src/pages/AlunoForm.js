import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { alunosAPI, professoresAPI } from '../services/apiService';

const AlunoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    escolaridade: 1,
    professorId: ''
  });
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfessores();
    if (isEditing) {
      fetchAluno();
    }
  }, [id, isEditing]);

  const fetchProfessores = async () => {
    try {
      const data = await professoresAPI.getAll();
      setProfessores(data);
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    }
  };

  const fetchAluno = async () => {
    try {
      setLoading(true);
      const aluno = await alunosAPI.getById(id);
      setFormData({
        nome: aluno.nome,
        dataNascimento: aluno.dataNascimento.split('T')[0], // Formatação para input date
        escolaridade: aluno.escolaridade,
        professorId: aluno.professorId
      });
    } catch (error) {
      setError('Erro ao carregar aluno');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'escolaridade' || name === 'professorId' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const alunoData = {
        ...formData,
        dataNascimento: new Date(formData.dataNascimento).toISOString()
      };

      if (isEditing) {
        await alunosAPI.update(id, alunoData);
        alert('Aluno atualizado com sucesso!');
      } else {
        await alunosAPI.create(alunoData);
        alert('Aluno criado com sucesso!');
      }
      
      navigate('/alunos');
    } catch (error) {
      setError('Erro ao salvar aluno');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/alunos');
  };

  if (loading && isEditing) return <div className="loading">Carregando...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{isEditing ? 'Editar Aluno' : 'Novo Aluno'}</h2>
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
            placeholder="Digite o nome do aluno"
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
          <label htmlFor="escolaridade">Escolaridade *</label>
          <select
            id="escolaridade"
            name="escolaridade"
            value={formData.escolaridade}
            onChange={handleChange}
            required
          >
            <option value={1}>Fundamental</option>
            <option value={2}>Médio</option>
            <option value={3}>Superior</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="professorId">Professor *</label>
          <select
            id="professorId"
            name="professorId"
            value={formData.professorId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um professor</option>
            {professores.map(professor => (
              <option key={professor.id} value={professor.id}>
                {professor.nome} - {professor.materia}
              </option>
            ))}
          </select>
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

export default AlunoForm;