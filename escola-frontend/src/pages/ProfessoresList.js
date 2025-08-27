import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { professoresAPI } from '../services/apiService';

const ProfessoresList = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    try {
      setLoading(true);
      const data = await professoresAPI.getAll();
      setProfessores(data);
    } catch (error) {
      setError('Erro ao carregar professores');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      try {
        await professoresAPI.delete(id);
        setProfessores(professores.filter(p => p.id !== id));
        alert('Professor excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir professor');
        console.error('Erro:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Professores</h2>
        <Link to="/professores/new" className="btn btn-primary">
          Novo Professor
        </Link>
      </div>

      {professores.length === 0 ? (
        <div className="no-data">
          <p>Nenhum professor cadastrado.</p>
          <Link to="/professores/new" className="btn btn-primary">
            Cadastrar Primeiro Professor
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
                <th>Matéria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map(professor => (
                <tr key={professor.id}>
                  <td>{professor.id}</td>
                  <td>{professor.nome}</td>
                  <td>{formatDate(professor.dataNascimento)}</td>
                  <td>{professor.materia}</td>
                  <td>
                    <div className="actions">
                      <Link 
                        to={`/professores/edit/${professor.id}`} 
                        className="btn btn-sm btn-secondary"
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={() => handleDelete(professor.id)}
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

export default ProfessoresList;