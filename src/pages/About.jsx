// Importações necessárias
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Heart, Target, Award, Users, Brain, Shield, Zap, Calendar, Activity, FileText } from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6 text-light" />,
      title: 'Impacto Social',
      description: 'Transformamos comunidades através de tecnologia e apoio psicológico acessível.'
    },
    {
      icon: <Brain className="w-6 h-6 text-accent" />,
      title: 'Inteligência Integrada',
      description: 'Algoritmos inteligentes para oferecer soluções adaptadas a cada necessidade.'
    },
    {
      icon: <Shield className="w-6 h-6 text-medium" />,
      title: 'Segurança Total',
      description: 'Proteção completa de dados e informações sensíveis dos usuários.'
    },
    {
      icon: <Users className="w-6 h-6 text-light" />,
      title: 'Acessibilidade',
      description: 'Interface inclusiva, intuitiva e compatível com diversas tecnologias assistivas.'
    }
  ];

  const features = [
    {
      icon: <Calendar className="w-5 h-5 text-light" />,
      title: 'Agendamento Fácil',
      description: 'Com o Bode Sistema Harmonia, marcar atendimentos é rápido e sem complicações.'
    },
    {
      icon: <Activity className="w-5 h-5 text-accent" />,
      title: 'Análise Inteligente',
      description: 'Visualize padrões de comportamento e identifique oportunidades de melhoria.'
    },
    {
      icon: <FileText className="w-5 h-5 text-medium" />,
      title: 'Histórico Completo',
      description: 'Registre todas as interações e mantenha um histórico detalhado e seguro.'
    },
    {
      icon: <Zap className="w-5 h-5 text-light" />,
      title: 'Interface Intuitiva',
      description: 'Navegação simples que garante conforto e produtividade para todos os usuários.'
    }
  ];

  const problems = [
    'Deseja organizar seus atendimentos de forma simples e eficiente?',
    'Quer ter controle total sobre agendamentos e dados importantes?',
    'Precisa de uma ferramenta que una tecnologia e acessibilidade?',
    'Busca uma plataforma confiável para gerenciamento de atendimentos?'
  ];

  const solutions = [
    'Bode Sistema Harmonia centraliza seus agendamentos em um só lugar.',
    'Oferece registros seguros e detalhados de todas as sessões.',
    'Painel administrativo intuitivo para visão completa da operação.',
    'Ferramentas inteligentes para análise de perfis e tomadas de decisão.',
    'Interface responsiva, acessível e amigável para todos os usuários.'
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Imagem de fundo do About */}
      <img
        src="/psi.webp"
        alt="Fundo"
        className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 z-0"
      />
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Conteúdo do About */}
      <div className="relative z-10 space-y-16 py-12">

        {/* ================= HERO SECTION ================= */}
        <section className="text-center px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
              <img src="/logo.webp" alt="Bode Sistema Harmonia" className="w-16 h-16 rounded-2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Sobre o Sistema Harmonia</h1>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl text-dark">
              <p className="text-lg leading-relaxed mb-4">
                O Bode Sistema Harmonia é a solução ideal para integrar tecnologia e cuidado social.
              </p>
              <p className="text-base leading-relaxed">
                Desenvolvido para simplificar a gestão de atendimentos e apoiar instituições em suas atividades.
              </p>
            </div>
          </div>
        </section>

        {/* ================= MISSÃO E VISÃO ================= */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl text-dark">
              <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
              <p className="leading-relaxed mb-4">
                Proporcionar uma plataforma que facilite o trabalho de instituições sociais e psicológicas.
              </p>
              <p className="text-sm leading-relaxed">
                Queremos unir tecnologia, organização e acessibilidade em um único sistema eficiente.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl text-dark">
              <h2 className="text-2xl font-bold mb-4">Nossa Visão</h2>
              <p className="leading-relaxed mb-4">
                Ser a plataforma de referência em gestão de atendimentos voluntários e acessíveis.
              </p>
              <p className="text-sm leading-relaxed">
                Transformar a maneira como instituições lidam com organização e cuidado social.
              </p>
            </div>
          </div>
        </section>

        {/* ================= PERGUNTAS E SOLUÇÕES ================= */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Por que escolher o Bode Sistema Harmonia?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg text-dark">
                <h3 className="text-xl font-semibold mb-4">Principais Perguntas</h3>
                <ul className="space-y-3">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-medium rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg text-dark">
                <h3 className="text-xl font-semibold mb-4">Como ajudamos</h3>
                <ul className="space-y-3">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FUNCIONALIDADES ================= */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Funcionalidades Principais</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg text-dark">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-light to-accent rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VALORES ================= */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg text-center text-dark">
                  <div className="w-12 h-12 bg-gradient-to-br from-medium to-light rounded-xl flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};  