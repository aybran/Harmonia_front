🧠 Sistema Harmonia - Sistema de Agendamento Psiquiátrico

Sistema web moderno para gestão de consultas psiquiátricas, desenvolvido com React 19 + Vite, focado em atendimentos voluntários em universidades, ONGs e projetos sociais.

📋 Índice

Sobre o Projeto

Funcionalidades

Tecnologias

Instalação

Uso

Estrutura do Projeto

Modelo de Dados

Simulação de API

Bate-papo com IA

Componentes

Rotas

Sistema de Design

Contribuição

Licença

🎯 Sobre o Projeto

O Sistema Harmonia é uma plataforma web desenvolvida para facilitar o agendamento e gestão de consultas psiquiátricas em ambientes de atendimento voluntário. O sistema oferece interfaces diferenciadas para psiquiatras e pacientes, com foco na experiência do usuário e eficiência operacional.

Objetivos

Simplificar o processo de agendamento de consultas

Facilitar a gestão de pacientes para psiquiatras

Fornecer relatórios e análises para acompanhamento

Manter histórico completo de sessões

Garantir interface moderna e responsiva

✨ Funcionalidades
👨‍⚕️ Para Psiquiatras

Dashboard Perrsonalizado: Visão geral com KPIs e próximos agendamentos

Gestão de Pacientes: Lista completa com informações detalhadas

Detalhes do Paciente: Histórico de sessões, anotações e relatórios

Gestão de Sessões: Edição de status, anotações e relatórios clínicos

Chat com IA: Assistente especializado em psiquiatria clínica

Relatórios e Analytics: Gráficos de frequência, status e alertas de risco

Agenda Individual: Controle de disponibilidade por psiquiatra

👤 Para Pacientes

Dashboard Simples: Próximos agendamentos e informações relevantes

Agendamento Flexível: Escolha de psiquiatra, dados e horário

Seleção de Especialistas: Lista de psiquiatras com especialidades

Verificação de Disponibilidade: Horários livres em tempo real

🔐 Sistema de Autenticação

Login seguro com validação

Diferenciação automática de perfis (psiquiatra/paciente)

Duas interfaces de login (padrão e moderna com glassmorphism)

Registro de novos usuários com validação

Contexto global de autenticação

Proteção de rotas por perfil

🛠 Tecnologias
Front-end

React 19.1.1 - Biblioteca principal

Vite 7.1.0 - Ferramenta de construção e servidor de desenvolvimento

React Router DOM 7.8.0 - Roteamento

Tailwind CSS 4.1.11 - Framework CSS moderno

Framer Motion 12.23.12 - Animações fluidas

Lucide React 0.539.0 - Ícones modernos

Recharts 3.1.2 - Gráficos e visualizações

Chart.js 4.5.0 - Gráficos alternativos

React Hot Toast 2.5.2 - Notificações

@huggingface/inference 4.6.1 - Integração com IA

Persistência

LocalStorage - Armazenamento local de dados

Mock API - Simulação de back-end

Projeto

Glassmorfismo - Efeitos visuais modernos

Design System - Paleta de cores consistente

Responsivo – Abordagem que prioriza o celular

🚀 Instalação
Pré-requisitos

Node.js 18+

npm ou yarn

Passos
git clone https://github.com/seu-usuario/sistema-agendamento-psiquiatrico.git
cd sistema-agendamento-psiquiatrico
npm install
# ou
yarn install
cp .env.example .env
# Edite o arquivo .env e adicione seu token do Hugging Face
npm run dev
# ou
yarn dev


Acesse no navegador: http://localhost:5173

💻 Uso
Contas de Teste

Psiquiatras

Dr. João Silva : psicologo@test.com
 / 123456 - Psiquiatria Clínica

Dra. Ana Costa : ana@test.com
 / 123456 - Terapia Cognitivo-Comportamental

Dr. Carlos Mendes : carlos@test.com
 / 123456 - Psiquiatria Infantil

Dra. Lúcia Ferreira : lucia@test.com
 / 123456 - Terapia Familiar

Paciente

Maria Santos : paciente@test.com
 / 123456

Fluxo de Uso

Login: Acesse com uma das contas de teste

Dashboard: Visualize informações relevantes ao seu perfil

Navegação: Use uma barra lateral para acessar diferentes títulos

Agendamento (Pacientes): Escolha psiquiatra, dados e horário

Gestão (Psiquiatras): Gerencie pacientes e sessões

📁 Estrutura do Projeto
src/
├── components/            # Componentes reutilizáveis
│   ├── Button.jsx        # Botão customizado com variantes
│   ├── Card.jsx          # Container com glassmorphism
│   ├── Input.jsx         # Input com validação e show/hide password
│   ├── LoadingSpinner.jsx# Spinner de carregamento
│   ├── MarkdownRenderer.jsx # Renderizador de markdown para IA
│   ├── Modal.jsx         # Modal responsivo com overlay
│   ├── PublicNavbar.jsx  # Navbar para páginas públicas
│   └── Sidebar.jsx       # Sidebar adaptativa para usuários autenticados
├── context/              # Contextos React
│   └── AuthContext.jsx   # Contexto de autenticação
├── pages/                # Páginas da aplicação
│   ├── About.jsx         # Página sobre o projeto
│   ├── Agendamento.jsx   # Sistema de agendamento (pacientes)
│   ├── ChatIA.jsx        # Chat com IA especializada (psiquiatras)
│   ├── DashboardPaciente.jsx # Dashboard para pacientes
│   ├── DashboardPsicologo.jsx # Dashboard para psiquiatras
│   ├── Home.jsx          # Página inicial pública
│   ├── Login.jsx         # Login padrão
│   ├── NotFound.jsx      # Página 404 personalizada
│   ├── PacienteDetalhes.jsx # Detalhes e histórico do paciente
│   ├── Pacientes.jsx     # Lista de pacientes (psiquiatras)
│   ├── Register.jsx      # Cadastro de usuários
│   ├── Relatorios.jsx    # Relatórios e analytics (psiquiatras)
│   └── SessaoDetalhes.jsx# Detalhes e gestão de sessões
├── routes/               # Configuração de rotas
│   └── AppRoutes.jsx     # Rotas principais
├── services/             # Serviços e APIs
│   ├── aiService.js      # Serviço de IA
│   └── mockApi.js        # API mockada
├── App.jsx               # Componente principal
├── index.css             # Estilos globais Tailwind
└── main.jsx              # Entry point

🔌 Simulação de API
Estrutura da API

Uma API mockada simula um backend real com as seguintes funcionalidades:

Autenticação

login(email, password) - Autenticação de usuário

register(userData) - Registro de novo usuário

Usuários

getPsychiatrists() - Lista de psiquiatras disponíveis

Pacientes

getPatients(psychiatristId) - Lista de pacientes do psiquiatra

Agendamentos

getAppointments(userId, userType) - Lista de agendamentos

createAppointment(appointmentData) - Criar agendamento

getAvailableSlots(date, psychiatristId) - Horários disponíveis

updateAppointment(id, data) - Atualizar agendamento

cancelAppointment(id) - Cancelar agendamento

Sessões

getSessionDetails(sessionId) - Detalhes da sessão

updateSessionStatus(sessionId, status) - Atualizar status

updateSessionNotes(sessionId, notes, report) - Atualizar agenda

Relatórios

getReportsData(psychiatristId) - Dados para relatórios

Persistência

Os dados são armazenados no LocalStorage do navegador:

harmonia_users - Usuários do sistema

harmonia_patients - Pacientes cadastrados

harmonia_appointments - Agendamentos e sessões

🤖 Bate-papo com IA
Funcionalidades

Assistente Especializada: IA treinada em psiquiatria clínica

Respostas Estruturadas: Formatação markdown para melhor legibilidade

Histórico de Conversa: Contexto suspenso durante sessão

Tratamento de Erros: Mensagens informativas para problemas de conexão

Interface Moderna: Design consistente com o sistema

Configuração

Token do Hugging Face já configurado no arquivo .env

Modelo Utilizado:

Fornecedor: Novita

Modelo: zai-org/GLM-4.5

Especialização: Psiquiatria Clínica

Parâmetros: max_tokens: 1500, temperatura: 0,7

Funcionalidades da IA

Respostas formatadas em markdown

Contexto de conversa suspensa (últimas 10 mensagens)

Orientações fundamentadas em evidências científicas

Tratamento de erros específicos (token inválido, limite de taxa, conexão)

Exemplos de Uso

"Como lidar com pacientes com ansiedade?"

"Técnicas para terapia infantil"

"Abordagens para terapia de casal"

"Sinais de alerta em depressão"

"Orientações sobre aspectos éticos"

🎨 Sistema de Design
Paleta de Cores
:root {
  --dark: #010440;      /* Azul escuro principal */
  --medium: #024873;    /* Azul médio */
  --light: #2493BF;     /* Azul claro */
  --accent: #26B0BF;    /* Azul accent */
  --background: #F2EFE9; /* Bege claro */
}

Tipografia

Primária: Inter (títulos e interface)

Secundária: Nunito (textos corridos)

Monoespacial: Roboto Mono (códigos)

Componentes Base

Botão

Variantes: primária, secundária, perigo

Estados: normal, pairar, carregando, desabilitado

Tamanhos: sm, md, lg

Cartão

Efeito de morfismo de vidro

Sombras suaves

Bordas arredondadas

Modal

Sobreposição com desfoque

Animações de entrada/saída

Responsivo

Pontos de interrupção:

sm: 640px

md: 768px

lg: 1024px

xl: 1280px

2xl: 1536px

🧩 Componentes
Componentes de UI

<Button />
Botão personalizado com variantes e estados.

<Button variant="primary" size="lg" loading={isLoading}>
  Confirmar
</Button>


<Card />
Container com efeito glassmorfismo.

<Card className="p-6">
  <h2>Título do Card</h2>
  <p>Conteúdo...</p>
</Card>


<Modal />
Modal responsivo com overlay.

<Modal isOpen={isOpen} onClose={handleClose} title="Título">
  <p>Conteúdo do modal...</p>
</Modal>


<MarkdownRenderer />
Renderizador de markdown para mensagens da IA.

<MarkdownRenderer content={markdownText} />

Componentes de Layout

<Sidebar />
Navegação lateral para usuários autenticados.

<PublicNavbar />
Barra de navegação para páginas públicas.

Componentes de Utilidade

<LoadingSpinner />
Indicador de carregamento com tamanhos variados.

🛣 Rotas
Rotas Públicas

/ - Página inicial

/about - Sobre o projeto

/login - Login padrão

/harmonia - Login moderno

/register - Cadastro

Rotas Protegidas

/dashboard - Dashboard (redirecionado por tipo de usuário)

/agendamento - Agendamento (apenas pacientes)

/pacientes - Lista de pacientes (apenas psiquiatras)

/pacientes/:id - Detalhes do paciente

/sessao/:sessionId - Detalhes da sessão

/chat-ia - Chat com IA (apenas psiquiatras)

/relatorios - Relatórios (apenas psiquiatras)

Proteção de Rotas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        {children}
      </main>
    </div>
  );
};