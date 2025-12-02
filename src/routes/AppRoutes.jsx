import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { PublicNavbar } from "../components/PublicNavbar";
import { LoadingSpinner } from "../components/LoadingSpinner";

// Páginas públicas
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Contato from "../pages/Contact";

// Páginas protegidas
import { Solicitacoes } from "../pages/Solicitacoes";
import { Agendamento } from "../pages/Agendamento";
import { ChatIA } from "../pages/ChatIA";

/*
import { DashboardPsicologo } from "../pages/DashboardPsicologo";
import { DashboardPaciente } from "../pages/DashboardPaciente";
import { Relatorios } from "../pages/Relatorios";
import { Pacientes } from "../pages/Pacientes";
import { PacienteDetalhes } from "../pages/PacientesDetalhes";
import { SessaoDetalhes } from "../pages/SessaoDetalhes";
import { HistoricoSessoes } from "../pages/Historico_de_Sessoes";
*/
import { NotFound } from "../pages/NotFound";

/* ==============================
   Rota Protegida
   ============================== */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">{children}</main>
    </div>
  );
};

/* ==============================
   Rota Pública
   ============================== */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <main className="">
        {children}
      </main>
    </div>
  );
};

/* ==============================
   Dashboard condicional
   ============================== */
const Dashboard = () => {
  const { user } = useAuth();
  return user?.type === "psicologo" ? (
    <DashboardPsicologo />
  ) : (
    <DashboardPaciente />
  );
};

/* ==============================
   Rotas da Aplicação
   ============================== */
export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PublicRoute>
              <About />
            </PublicRoute>
          }
        />

        <Route
          path="/contato"
          element={
            <PublicRoute>
              <Contato />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Rotas Protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agendamento"
          element={
            <ProtectedRoute>
              <Agendamento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat-ia"
          element={
            <ProtectedRoute>
              <ChatIA />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solicitacoes"
          element={
            <ProtectedRoute>
              <Solicitacoes />
            </ProtectedRoute>
          }
        />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
