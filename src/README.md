Harmonia - Sistema de Gestão de Música e Artistas

Sistema web moderno para gestão de músicas, artistas, álbuns e playlists, desenvolvido com React 19 + Vite. Focado em proporcionar uma experiência intuitiva para usuários e administradores.

📋 Índice

Sobre o Projeto

Funcionalidades

Tecnologias

Instalação

Uso

Estrutura do Projeto

Modelo de Dados

API Mock

Componentes

Rotas

Design System

Contribuição

Licença

🎯 Sobre o Projeto

O Harmonia é uma plataforma web desenvolvida para facilitar a organização e o gerenciamento de conteúdos musicais, como músicas, artistas, álbuns e playlists. O sistema oferece interfaces diferenciadas para administradores e usuários comuns, priorizando usabilidade e desempenho.

Objetivos

Simplificar o cadastro e edição de músicas, artistas e álbuns

Facilitar a criação e gestão de playlists personalizadas

Oferecer uma experiência de busca rápida e eficiente

Fornecer visualizações e estatísticas sobre os conteúdos

Garantir interface moderna e responsiva para todos dispositivos

✨ Funcionalidades
Para Administradores

Dashboard Personalizado: visão geral de conteúdos e estatísticas

Gestão de Artistas: cadastro, edição e exclusão

Gestão de Músicas e Álbuns: controle completo de metadados

Gestão de Playlists: criação e moderação

Relatórios e Analytics: gráficos sobre popularidade e uso

Para Usuários

Dashboard Simples: exibição de playlists e músicas favoritas

Busca e Filtros: pesquisa por artista, álbum ou gênero

Playlists Personalizadas: criação e edição de playlists próprias

Player Integrado: reprodução de músicas com controles básicos

🛠 Tecnologias
Frontend

React 19.1.1 – Biblioteca principal

Vite 7.1.0 – Ferramenta de build e servidor de desenvolvimento

React Router DOM 7.8.0 – Gerenciamento de rotas

Tailwind CSS 4.1.11 – Framework CSS moderno

Framer Motion 12.23.12 – Animações fluidas

Lucide React 0.539.0 – Ícones modernos

Persistência

LocalStorage – Armazenamento local dos dados

Mock API – Simulação de backend

Design

Glassmorphism – Efeitos visuais modernos

Design System – Paleta de cores consistente

Responsivo – Mobile-first approach

🚀 Instalação
Pré-requisitos

Node.js 18+

npm ou yarn

Passos
git clone https://github.com/seu-usuario/sistema-harmonia.git
cd sistema-harmonia
npm install
# ou
yarn install
npm run dev
# ou
yarn dev


Acesse no navegador:

http://localhost:5173

💻 Uso
Contas de Teste
Administradores

admin@harmonia.com
 / 123456

Usuários

usuario@harmonia.com
 / 123456

Fluxo de Uso

Login com uma das contas de teste

Acesso ao dashboard conforme o perfil

Navegação via sidebar para diferentes funcionalidades

Administração ou uso conforme perfil

📁 Estrutura do Projeto
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.jsx       # Botão customizado com variantes
│   ├── Card.jsx         # Container com glassmorphism
│   ├── Input.jsx        # Input com validação
│   ├── LoadingSpinner.jsx # Spinner de carregamento
│   ├── Modal.jsx        # Modal responsivo
│   ├── Navbar.jsx       # Barra de navegação
│   └── Sidebar.jsx      # Menu lateral adaptativo
├── context/             # Contextos React
│   └── AuthContext.jsx  # Contexto de autenticação
├── pages/               # Páginas da aplicação
│   ├── Home.jsx         # Página inicial pública
│   ├── Login.jsx        # Tela de login
│   ├── DashboardAdmin.jsx # Dashboard administrador
│   ├── DashboardUser.jsx  # Dashboard usuário comum
│   ├── Artists.jsx      # Lista e gestão de artistas
│   ├── Albums.jsx       # Lista e gestão de álbuns
│   ├── Songs.jsx        # Lista e gestão de músicas
│   ├── Playlists.jsx    # Gestão de playlists
│   └── NotFound.jsx     # Página 404
├── routes/              # Configuração de rotas
│   └── AppRoutes.jsx    # Rotas principais
├── services/            # Serviços e APIs
│   └── mockApi.js       # API mockada
├── App.jsx              # Componente principal
├── index.css            # Estilos globais Tailwind
└── main.jsx             # Entry point

🔌 API Mock
Funcionalidades simuladas

Autenticação: login(email, senha) e registro

Gestão de Artistas: listagem, cadastro, edição, exclusão

Gestão de Músicas e Álbuns: CRUD completo

Gestão de Playlists: criação e moderação

Busca e filtros em tempo real

Persistência

Dados armazenados em LocalStorage

🎨 Design System
Paleta de Cores
:root {
  --dark: #1F2937;       /* Cinza escuro */
  --medium: #3B82F6;     /* Azul médio */
  --light: #60A5FA;      /* Azul claro */
  --accent: #2563EB;     /* Azul acentuado */
  --background: #F9FAFB; /* Branco suave */
}

Tipografia

Primária: Inter (títulos e interface)

Secundária: Nunito (textos)

Monospace: Roboto Mono (códigos)

Componentes Base

Button: variantes primary, secondary, danger

Card: efeito glassmorphism, sombras suaves

Modal: overlay com blur, animações suaves

LoadingSpinner: indicadores de carregamento

🛣 Rotas
Públicas

/ – Página inicial

/login – Login

/register – Registro

Protegidas (exemplo)

/dashboard – Dashboard (redireciona por perfil)

/artists – Gestão de artistas (admin)

/albums – Gestão de álbuns (admin)

/songs – Gestão de músicas (admin)

/playlists – Playlists (usuários)

🤝 Contribuição

Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/NomeDaFeature)

Commit suas mudanças (git commit -m 'Adiciona nova feature')

Push para sua branch (git push origin feature/NomeDaFeature)

Abra um Pull Request

Padrões de Código

ESLint para consistência

Prettier para formatação

Componentes em PascalCase

Funções em camelCase

Constantes em UPPER_CASE

📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👥 Equipe

Desenvolvedor Principal: [Seu Nome]

Design: [Nome do Designer]

📞 Contato

GitHub: https://github.com/aybran?tab=repositories

Desenvolvedor:Aybran