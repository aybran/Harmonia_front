 
// ===== IMPORTS =====
// MOTIVO: Importamos apenas o que precisamos para manter o bundle pequeno e organizado
 
// Hooks do React para gerenciamento de estado e efeitos colaterais
// PORQUE: useState permite controlar dados que mudam (psicólogo selecionado, texto digitado)
// PORQUE: useEffect executa código quando o componente é criado (carregar lista de psicólogos)
import { useState, useEffect } from 'react';
 
// Hook para navegação entre páginas sem recarregar a página (SPA - Single Page Application)
// PORQUE: Precisamos redirecionar o usuário para o dashboard após enviar a solicitação
import { useNavigate } from 'react-router-dom';
 
// Context personalizado para autenticação do usuário
// PORQUE: Precisamos dos dados do usuário logado (nome, email) para enviar na solicitação
import { useAuth } from '../context/AuthContext';
 
// API mockada para simulação de backend
// PORQUE: Em desenvolvimento, simulamos um servidor real para testar funcionalidades
import { mockApi } from '../services/mockApi';
 
// Componentes reutilizáveis do sistema
// PORQUE: Mantém consistência visual e reduz duplicação de código
import { Card } from '../components/Card';
import { Button } from '../components/Button';
 
// Ícone da biblioteca Lucide React
// PORQUE: Ícones melhoram a UX e tornam a interface mais intuitiva
import { Bell } from 'lucide-react';
 
// Biblioteca para notificações toast
// PORQUE: Feedback visual imediato para o usuário sobre sucesso/erro das ações
import toast from 'react-hot-toast';
import { FormTextarea } from '../components/TextArea';
import { FormSelect } from '../components/FormSelect';
import { TextBlock } from '../components/TextBlock';

 
// ===== COMPONENTE PRINCIPAL =====
// ARQUITETURA: Componente funcional React usando hooks (padrão moderno)
// PORQUE: Mais simples que classes, melhor performance, hooks facilitam reutilização de lógica
export const Agendamento = () => {
 
    // ===== HOOKS E ESTADO =====
    // PADRÃO: Declaramos todos os hooks no topo do componente (regra do React)
 
    // Extrai dados do usuário logado do contexto global
    // PORQUE: Precisamos do nome e email para preencher automaticamente a solicitação
    const { user } = useAuth();
 
    // Hook para navegação programática entre rotas
    // PORQUE: Após enviar solicitação, redirecionamos para dashboard sem reload
    const navigate = useNavigate();
 
    // ===== ESTADOS LOCAIS DO COMPONENTE =====
    // PADRÃO: Cada estado controla uma parte específica da interface
 
    // Estado: ID do psicólogo selecionado no dropdown
    // PORQUE: Precisamos saber qual psicólogo o paciente escolheu
    // TIPO: string (vazio inicialmente, depois ID numérico como string)
    const [selectedPsychologist, setSelectedPsychologist] = useState('');
 
    // Estado: Lista de todos os psicólogos disponíveis
    // PORQUE: Populamos o dropdown com dados vindos da API
    // TIPO: array de objetos {id, name, specialty}
    const [psychologists, setPsychologists] = useState([]);
 
    // Estado: Controla se o formulário está sendo enviado
    // PORQUE: Mostra loading no botão e previne múltiplos envios
    // TIPO: boolean (false = normal, true = enviando)
    const [submitting, setSubmitting] = useState(false);
 
    // Estado: Dados do formulário de solicitação
    // PORQUE: Armazena informações digitadas pelo usuário
    // TIPO: objeto com description (string) e urgency (string)
    const [requestData, setRequestData] = useState({
        description: '', // Texto livre descrevendo a necessidade
        urgency: 'media' // Padrão: urgência média
    });
 
    // ===== EFEITOS COLATERAIS =====
    // CONCEITO: useEffect executa código em momentos específicos do ciclo de vida
    // QUANDO: Array vazio [] = executa apenas uma vez quando componente é criado
    // PORQUE: Precisamos carregar a lista de psicólogos assim que a página abre
    useEffect(() => {
        loadPsychologists(); // Chama função que busca dados da API
    }, []); // Dependências vazias = executa só na montagem do componente
 
    // ===== FUNÇÕES =====
    // PADRÃO: Funções assíncronas para operações que demoram (API calls)
 
    // Função para carregar lista de psicólogos da API
    // ASYNC/AWAIT: Padrão moderno para lidar com operações assíncronas
    // PORQUE: Chamadas de API são assíncronas (não sabemos quanto tempo demora)
    const loadPsychologists = async () => {
        try {
            // Chama API mockada que simula busca no servidor
            // AWAIT: Espera a resposta antes de continuar
            const data = await mockApi.getPsychologists();
 
            // Atualiza estado com dados recebidos
            // PORQUE: Isso faz o React re-renderizar o componente com novos dados
            setPsychologists(data);
        } catch {
            // Se der erro (rede, servidor, etc), mostra notificação
            // PORQUE: Usuário precisa saber que algo deu errado
            toast.error('Erro ao carregar psicólogos');
        }
    };
 
    // Função para processar envio do formulário
    // EVENT HANDLER: Função que responde a eventos do usuário (submit do form)
    // ASYNC: Porque envia dados para API (operação que demora)
    const handleRequestSubmit = async (e) => {
        // Previne comportamento padrão do formulário (reload da página)
        // PORQUE: Em SPAs, não queremos recarregar a página
        e.preventDefault();
 
        // ===== VALIDAÇÃO CLIENT-SIDE =====
        // PORQUE: Feedback imediato, não precisa ir ao servidor para validar
        // PERFORMANCE: Evita requisições desnecessárias
        if (!selectedPsychologist || !requestData.description) {
            toast.error('Selecione um psicólogo e descreva sua necessidade');
            return; // Para execução se validação falhar
        }
 
        // Ativa estado de loading
        // PORQUE: Desabilita botão e mostra spinner para evitar duplo envio
        // UX: Usuário sabe que algo está acontecendo
        setSubmitting(true);
 
        try {
            // ===== ENVIO PARA API =====
            // Monta objeto com todos os dados necessários
            // ESTRUTURA: Combina dados do usuário logado + dados do formulário
            await mockApi.createRequest({
                patientName: user.name,           // Do contexto de autenticação
                patientEmail: user.email,         // Do contexto de autenticação
                patientPhone: user.phone || '(11) 99999-9999', // Fallback se não tiver telefone
                preferredPsychologist: parseInt(selectedPsychologist), // Converte string para número
                description: requestData.description,  // Do estado do formulário
                urgency: requestData.urgency          // Do estado do formulário
            });
 
            // ===== SUCESSO =====
            // Mostra feedback positivo
            toast.success('Solicitação enviada! O psicólogo avaliará e entrará em contato se aceitar você como paciente.');
 
            // Redireciona para dashboard
            // PORQUE: Fluxo natural após completar ação
            navigate('/dashboard');
 
        } catch {
            // ===== ERRO =====
            // Qualquer erro (rede, servidor, validação) cai aqui
            // UX: Usuário sabe que algo deu errado
            toast.error('Erro ao enviar solicitação');
        } finally {
            // ===== CLEANUP =====
            // SEMPRE executa, independente de sucesso ou erro
            // PORQUE: Precisamos desativar loading em qualquer caso
            setSubmitting(false);
        }
    };
 
    // ===== RENDERIZAÇÃO (JSX) =====
    // CONCEITO: JSX = JavaScript + XML, permite escrever HTML dentro do JavaScript
    // PROCESSO: React converte JSX em elementos DOM reais
 
    return (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Cabeçalho */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Solicitar ser Paciente</h1>
            <p className="text-base text-dark/70">
              Escolha um psicólogo e descreva sua necessidade de atendimento
            </p>
          </div>
   
          {/* Card com formulário */}
          <Card>
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              {/* Seleção de psicólogo */}
              <FormSelect
                label="Escolha o Psicólogo"
                icon={Bell}
                value={selectedPsychologist}
                onChange={(e) => setSelectedPsychologist(e.target.value)}
                options={psychologists.map((psych) => ({
                  value: psych.id,
                  label: `${psych.name} - ${psych.specialty}`,
                }))}
                placeholder="Selecione um psicólogo"
                required
              />
   
              {/* Descrição */}
              <FormTextarea
                label="Descreva sua necessidade"
                value={requestData.description}
                onChange={(e) =>
                  setRequestData({ ...requestData, description: e.target.value })
                }
                placeholder="Ex: Gostaria de ser seu paciente. Preciso de ajuda com ansiedade..."
                required
                rows={4}
              />
   
              {/* Nível de urgência */}
              <div>
                <label className="block text-lg font-medium text-dark mb-3">
                  Nível de Urgência
                </label>
                <select
                  value={requestData.urgency}
                  onChange={(e) =>
                    setRequestData({ ...requestData, urgency: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
                >
                  <option value="baixa">Baixa - Posso aguardar</option>
                  <option value="media">Média - Prefiro em breve</option>
                  <option value="alta">Alta - Preciso urgentemente</option>
                </select>
              </div>
   
              {/* Perfil do psicólogo selecionado */}
              {selectedPsychologist && (
                <Card className="bg-blue-50 space-y-4">
                  <PsychologistProfile
                    photo={psychologists.find(p => p.id === parseInt(selectedPsychologist))?.photo}
                    nome={psychologists.find(p => p.id === parseInt(selectedPsychologist))?.name}
                    specialty={psychologists.find(p => p.id === parseInt(selectedPsychologist))?.specialty}
                    bio={psychologists.find(p => p.id === parseInt(selectedPsychologist))?.bio}
                    rating={psychologists.find(p => p.id === parseInt(selectedPsychologist))?.rating}
                    contactInfo={{
                      email: psychologists.find(p => p.id === parseInt(selectedPsychologist))?.email,
                      phone: psychologists.find(p => p.id === parseInt(selectedPsychologist))?.phone,
                    }}
                  />
   
                  <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                    <p className="text-blue-800">
                      <strong>Como funciona:</strong> Sua solicitação será enviada ao psicólogo.
                      Se aceita, ele entrará em contato para agendar as sessões nos horários que funcionem para ambos.
                    </p>
                  </div>
                </Card>
              )}
   
              {/* Botões */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
   
                <Button
                  type="submit"
                  loading={submitting}
                  className="flex-1"
                  disabled={!selectedPsychologist || !requestData.description}
                >
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </Card>
        </div>
      );
    };
 