const express = require('express');
const { sequelize, Usuario } = require('./models'); // Certifique-se de que o models/index.js está exportando sequelize e Usuario
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware para JSON
app.use(express.json());

// Teste de conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });

// Rotas
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Listar usuários
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Criar usuário
app.post('/api/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoUsuario = await Usuario.create({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Editar usuário
app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const [atualizado] = await Usuario.update({ nome, email, senha }, { where: { id } });
    if (!atualizado) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário
app.delete('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletado = await Usuario.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
