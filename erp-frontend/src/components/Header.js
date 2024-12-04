import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#f4f4f4' }}>
      <h1>ERP Recursos Humanos</h1>
      <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Sair
      </button>
    </header>
  );
}

export default Header;
