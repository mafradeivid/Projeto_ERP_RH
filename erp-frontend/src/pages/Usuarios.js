import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Certifique-se de ter configurado a API

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Busca os usuários do backend
    api.get('/usuarios')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
