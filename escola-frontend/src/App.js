import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AlunosList from './pages/AlunosList';
import AlunoForm from './pages/AlunoForm';
import ProfessoresList from './pages/ProfessoresList';
import ProfessorForm from './pages/ProfessorForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alunos" element={<AlunosList />} />
            <Route path="/alunos/new" element={<AlunoForm />} />
            <Route path="/alunos/edit/:id" element={<AlunoForm />} />
            <Route path="/professores" element={<ProfessoresList />} />
            <Route path="/professores/new" element={<ProfessorForm />} />
            <Route path="/professores/edit/:id" element={<ProfessorForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;