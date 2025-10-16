import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Componente de botão reutilizável
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-medium text-white hover:bg-accent focus:ring-light',
    secondary:
      'bg-medium/30 border border-light text-light hover:bg-accent hover:border-accent focus:ring-light',
    back: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-500', // Botão Voltar verde
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${loading ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
};

// Componente de detalhes do paciente (exemplo)
export const DetalhesPaciente = ({ paciente }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      {/* Botão Voltar */}
      <Button variant="back" size="md" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Voltar
      </Button>

      {/* Dados do paciente */}
      <h1 className="text-2xl font-bold text-dark">{paciente.name}</h1>
      <p>ID: {paciente.id}</p>
      <p>Idade: {paciente.age} anos</p>
      <p>Telefone: {paciente.phone}</p>
      <p>Email: {paciente.email}</p>
      {/* etc... */}
    </div>
  );
};

// Exemplo de uso
const pacienteExemplo = {
  id: 6,
  name: 'Lucas Pereira',
  age: 37,
  phone: '(11) 99999-6666',
  email: 'lucas.pereira@email.com',
};

export default function App() {
  return <DetalhesPaciente paciente={pacienteExemplo} />;
}
