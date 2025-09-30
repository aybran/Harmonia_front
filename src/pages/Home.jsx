// Importações necessárias
import { Link } from 'react-router-dom'; // Para navegação entre páginas
import { motion } from 'framer-motion'; // Para animações suaves
import { Shield, Zap, Users, Calendar, Activity, FileText } from 'lucide-react'; // Ícones vetoriais
import { Button } from '../components/Button'; // Botão customizado do projeto

// Página inicial (Home)
export const Home = () => {
  // Lista de recursos/funcionalidades que serão exibidos na seção de "features"
  const features = [
    {
      icon: Calendar,
      title: 'Agenda Dinâmica',
      description: 'Visualização de horários disponíveis com marcação automática e lembretes por e-mail'
    },
    {
      icon: Shield,
      title: 'Privacidade Garantida',
      description: 'Autenticação segura via JWT e proteção total dos dados sensíveis dos pacientes'
    },
    {
      icon: Activity,
      title: 'Análise Inteligente',
      description: 'Machine Learning para identificar padrões emocionais e agrupar perfis de risco'
    },
    {
      icon: Users,
      title: 'Impacto Social',
      description: 'Voltado para projetos voluntários, universidades e ONGs que oferecem apoio psicológico'
    },
    {
      icon: FileText,
      title: 'Histórico Estruturado',
      description: 'Registro organizado de sessões com temas, recomendações e evolução do paciente'
    },
    {
      icon: Zap,
      title: 'Interface Acolhedora',
      description: 'Design responsivo e acessível, pensado para conforto emocional dos usuários'
    }
  ];

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Fundo com imagem e blur */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg.webp" // Substitua pelo caminho correto
            alt="Fundo"
            className="w-full h-full object-cover filter blur-md scale-110"
          />
          {/* Overlay escuro opcional para contraste */}
          <div className="absolute inset-0 bg-white/35"></div>
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo centralizada */}
            <div className="w-32 h-32 flex items-center justify-center mx-auto mb-8 overflow-hidden">
              <img src="/logo.webp" alt="Sistema Harmonia" className="w-full h-full object-cover" />
            </div>

            {/* Nome do sistema */}
            <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6">
              Sistema Harmonia
            </h1>

            {/* Subtítulo */}
            <h2 className="text-2xl md:text-3xl font-medium text-dark mb-6">
              Sistema de Agendamento Psicológico
            </h2>

            {/* Descrição principal */}
            <p className="text-xl text-dark mb-8 max-w-3xl mx-auto leading-relaxed">
              Sistema Harmonia
              O caminho suave para o bem-estar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Aqui você pode continuar com outras seções do site */}

    </div>
  );
};
