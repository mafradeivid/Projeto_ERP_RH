import React, { useState } from 'react';
import api from '../services/api';

const CadastroUsuario = () => {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!form.nome || !form.email || !form.senha) {
      setMensagem('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/usuarios', form);
      setMensagem(response.data.message); // Mostra mensagem do backend
      setForm({ nome: '', email: '', senha: '' }); // Limpa o formulário
    } catch (error) {
      setMensagem(error.response.data.error || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Cadastro de Usuário</h1>
      {mensagem && <p>{mensagem}</p>}
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="senha" type="password" value={form.senha} onChange={handleChange} placeholder="Senha" />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroUsuario;
