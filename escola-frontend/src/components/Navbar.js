import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Sistema Escola
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/professores" className="nav-link">
              Professores
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/alunos" className="nav-link">
              Alunos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;