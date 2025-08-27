import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alunosAPI } from '../services/apiService';

const AlunosList = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const data = await alunosAPI.getAll();
      setAlunos(data);
    } catch (error) {
      setError('Erro ao carregar alunos');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        await alunosAPI.delete(id);
        setAlunos(alunos.filter(a => a.id !== id));
        alert('Aluno excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir aluno');
        console.error('Erro:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getEscolaridadeText = (escolaridade) => {
    const tipos = {
      1: 'Fundamental',
      2: 'Médio',
      3: 'Superior'
    };
    return tipos[escolaridade] || 'Não informado';
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Alunos</h2>
        <Link to="/alunos/new" className="btn btn-primary">
          Novo Aluno
        </Link>
      </div>

      {alunos.length === 0 ? (
        <div className="no-data">
          <p>Nenhum aluno cadastrado.</p>
          <Link to="/alunos/new" className="btn btn-primary">
            Cadastrar Primeiro Aluno
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Escolaridade</th>
                <th>Professor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map(aluno => (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{formatDate(aluno.dataNascimento)}</td>
                  <td>{getEscolaridadeText(aluno.escolaridade)}</td>
                  <td>{aluno.professorNome || 'N/A'}</td>
                  <td>
                    <div className="actions">
                      <Link 
                        to={`/alunos/edit/${aluno.id}`} 
                        className="btn btn-sm btn-secondary"
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={() => handleDelete(aluno.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlunosList;