import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, BarChart3, Calendar, User, Users, MessageCircle, Bell } from 'lucide-react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Apenas links para o usuário do tipo paciente
  const navLinks = user?.type === 'paciente'
    ? [
      { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
      { to: '/agendamento', label: 'Solicitar Sessão', icon: Calendar },
      { to: '/historico-sessoes', label: 'Histórico de Sessões', icon: Users }
    ]
    :[
      { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
      { to: '/solicitacoes', label: 'Solicitações', icon: Bell },
      { to: '/pacientes', label: 'Pacientes', icon: Users },
      { to: '/chat-ia', label: 'Chat IA', icon: MessageCircle },
      { to: '/relatorios', label: 'Relatórios', icon: BarChart3 }
    ];

  // Se precisar suportar outros tipos futuramente, pode adicionar aqui

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-dark text-white p-2 rounded-lg shadow-lg"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-dark shadow-xl transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 p-6 border-b border-white/10">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img src="/logo2.png" alt="Sistema Harmonia" className="w-10 h-10 rounded-lg" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Lunysse</span>
              <p className="text-xs text-white/60">Sistema Psicológico</p>
            </div>
          </div>

          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-xs text-white/60 capitalize">{user?.type}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navLinks.length === 0 ? (
                <li className="text-white px-4 py-3">Nenhum link disponível</li>
              ) : (
                navLinks.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive(link.to)
                        ? 'bg-light text-black'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </nav>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
