import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/cadastro-funcionarios">Cadastro de Funcionários</Link></li>
          <li><Link to="/encargos">Encargos</Link></li>
          <li><Link to="/beneficios">Benefícios</Link></li>
          <li><Link to="/relatorios">Relatórios</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
