import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço de API configurado

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
      console.log('Login bem-sucedido. Salvando token no localStorage.');
      navigate('/'); // Redireciona para o dashboard
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciais inválidas. Tente novamente.');
      } else if (err.response && err.response.status === 404) {
        setError('Usuário não encontrado.');
      } else {
        setError('Erro ao realizar login. Tente novamente mais tarde.');
      }
      console.error('Erro ao realizar login:', err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Conecte-se</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
