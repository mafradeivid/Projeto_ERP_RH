import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CadastroFuncionarios from './pages/CadastroFuncionarios';
import Encargos from './pages/Encargos';
import Beneficios from './pages/Beneficios';
import Relatorios from './pages/Relatorios';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';
import Layout from './components/Layout'; // Importa o layout do Material-UI

// Função para rotas protegidas
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" state={{ message: 'Você precisa estar logado para acessar esta página.' }} />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de login (não precisa do Layout) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas com layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/cadastro-funcionarios"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <CadastroFuncionarios />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/encargos"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Encargos />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/beneficios"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Beneficios />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/relatorios"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Relatorios />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <Usuarios />
                </Layout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
