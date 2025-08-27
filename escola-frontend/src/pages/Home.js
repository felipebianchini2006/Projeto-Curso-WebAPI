import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Sistema de Gerenciamento Escolar</h1>
        <p>Gerencie professores e alunos de forma simples e eficiente</p>
      </div>
      
      <div className="cards-container">
        <div className="card">
          <h3>Professores</h3>
          <p>Cadastre e gerencie os professores da instituição</p>
          <div className="card-actions">
            <Link to="/professores" className="btn btn-primary">
              Ver Professores
            </Link>
            <Link to="/professores/new" className="btn btn-secondary">
              Novo Professor
            </Link>
          </div>
        </div>

        <div className="card">
          <h3>Alunos</h3>
          <p>Cadastre e gerencie os alunos da instituição</p>
          <div className="card-actions">
            <Link to="/alunos" className="btn btn-primary">
              Ver Alunos
            </Link>
            <Link to="/alunos/new" className="btn btn-secondary">
              Novo Aluno
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;