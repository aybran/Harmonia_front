// Importação de rotas do React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa contexto de autenticação
import { useAuth } from '../context/AuthContext';

// Componentes reutilizáveis
import { Sidebar } from '../components/Sidebar';
import { PublicNavbar } from '../components/PublicNavbar';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Páginas públicas
import { Home } from '../pages/Home';
import { About } from '../pages/About';

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import Contato from '../pages/Contact';
/*
// Páginas protegidas
import { DashboardPsicologo } from '../pages/DashboardPsicologo';
import { DashboardPaciente } from '../pages/DashboardPaciente';
import { Agendamento } from '../pages/Agendamento';
import { Relatorios } from '../pages/Relatorios';
import { Pacientes } from '../pages/Pacientes';
import { PacienteDetalhes } from '../pages/PacienteDetalhes';
import { SessaoDetalhes } from '../pages/SessaoDetalhes';
import { ChatIA } from '../pages/ChatIA';
import { HistoricoSessoes } from '../pages/Historico_de_Sessoes';
import { Solicitacoes } from '../pages/Solicitacoes';
import { NotFound } from '../pages/NotFound';
*/
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner size="lg" />;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner size="lg" />;
  if (user) return <Navigate to="/dashboard" replace />;
  return (
    <div className="">
      <PublicNavbar />
      <main className="">
        {children}
      </main>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  return user?.type === 'psicologo' ? <DashboardPsicologo /> : <DashboardPaciente />;
};

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Rotas Públicas */}
        <Route path="/" element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />

        <Route path="/about" element={
          <PublicRoute>
            <About />
          </PublicRoute>
        } />

        <Route path="/contato" element={
          <PublicRoute>
            <Contato />
          </PublicRoute>
        } />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Rotas Protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/agendamento" element={
          <ProtectedRoute>
            <Agendamento />
          </ProtectedRoute>
        } />

        <Route path="/Chat-ia" element={
          <ProtectedRoute>
            <ChatIA />
          </ProtectedRoute>
        } />
        <Route path="/historico-sessoes" element={
          <ProtectedRoute>
            <HistoricoSessoes />
          </ProtectedRoute>
        } />

        <Route path="/Relatorios" element={
          <ProtectedRoute>
            <Relatorios />
          </ProtectedRoute>
        } />

        <Route path="/solicitacoes" element={
          <ProtectedRoute>
            <Solicitacoes />
          </ProtectedRoute>
        } />

        <Route path="/pacientes" element={
          <ProtectedRoute>
            <Pacientes />
          </ProtectedRoute>
        } />

        <Route path="/Pacientes/:id" element={
          <ProtectedRoute>
            <PacienteDetalhes />
          </ProtectedRoute>
        } />
        <Route path="/sessao/:sessionId" element={
          <ProtectedRoute>
            <SessaoDetalhes /> {/* Detalhes de sessão específica */}
          </ProtectedRoute>
        } />
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};
