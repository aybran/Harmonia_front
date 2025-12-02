import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { psychologistService, requestService } from '../services/apiService';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import {  Bell } from 'lucide-react';
import toast from 'react-hot-toast';
export const Agendamento = () => {
const { user } = useAuth();
const navigate = useNavigate();
const [selectedPsychologist, setSelectedPsychologist] = useState('');
const [psychologists, setPsychologists] = useState([]);
const [submitting, setSubmitting] = useState(false);
const [requestData, setRequestData] = useState({
    description: '',
    urgency: 'media'
  });
  useEffect(() => {
    loadPsychologists();
  }, []);
  const loadPsychologists = async () => {
    try {
      const data = await psychologistService.getPsychologists();
      setPsychologists(data);
    } catch {
      toast.error('Erro ao carregar psicólogos');
    }
  };
  const handleRequestSubmit = async (e) => {
    e.preventDefault();  
    if (!selectedPsychologist || !requestData.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    setSubmitting(true);
    try {
      await requestService.createRequest({
        patient_id: user.id,
        patient_Name: user.name,          
        patient_Email: user.email,        
        patient_phone: user.phone,
        preferredPsychologist: parseInt(selectedPsychologist),
        description: requestData.description,  
        urgency: requestData.urgency,
        preferred_dates: [],    
        preferred_times: []    
      });
      toast.success('Solicitação enviada! O psicólogo avaliará e entrará em contato se aceitar você como paciente.');
      navigate('/dashboard');
    } catch {
      toast.error('Erro ao enviar solicitação');
    } finally {
      setSubmitting(false);
    }
  };
 
  // ===== RENDERIZAÇÃO (JSX) =====
  // CONCEITO: JSX = JavaScript + XML, permite escrever HTML dentro do JavaScript
  // PROCESSO: React converte JSX em elementos DOM reais
  return (
    // ===== CONTAINER PRINCIPAL =====
    // LAYOUT: Centraliza conteúdo e limita largura para melhor legibilidade
    // max-w-2xl: largura máxima de 672px (responsivo)
    // mx-auto: margin horizontal automática (centraliza)
    // space-y-6: espaçamento vertical de 1.5rem entre filhos diretos
    // PORQUE: Design responsivo que funciona bem em desktop e mobile
    <div className="max-w-2xl mx-auto space-y-6">
     
      {/* ===== CABEÇALHO DA PÁGINA ===== */}
      {/* HIERARQUIA VISUAL: Título grande + subtítulo menor */}
      {/* CENTRALIZAÇÃO: text-center alinha todo o conteúdo ao centro */}
      <div className="text-center">
        {/* TÍTULO PRINCIPAL */}
        {/* SEMÂNTICA: h1 indica o título mais importante da página */}
        {/* ESTILO: text-3xl (30px), font-bold (700), text-dark (cor customizada) */}
        {/* ESPAÇAMENTO: mb-2 (margin-bottom 0.5rem) */}
        <h1 className="text-3xl font-bold text-dark mb-2">Solicitar ser Paciente</h1>
       
        {/* SUBTÍTULO EXPLICATIVO */}
        {/* CONTRASTE: text-dark/70 = cor escura com 70% de opacidade */}
        {/* PORQUE: Hierarquia visual - menos importante que o título */}
        <p className="text-dark/70">Escolha um psicólogo e descreva sua necessidade de atendimento</p>
      </div>
 
      {/* ===== CARD PRINCIPAL COM FORMULÁRIO ===== */}
      {/* COMPONENTE REUTILIZÁVEL: Card aplica estilos consistentes */}
      {/* GLASSMORPHISM: Efeito visual moderno com transparência e blur */}
      {/* PORQUE: Agrupa visualmente o formulário e melhora a hierarquia */}
      <Card>
        {/* ===== FORMULÁRIO HTML ===== */}
        {/* EVENT BINDING: onSubmit conecta evento HTML com função JavaScript */}
        {/* LAYOUT: space-y-6 = espaçamento vertical de 1.5rem entre campos */}
        {/* PORQUE: Organização visual clara entre diferentes seções */}
        <form onSubmit={handleRequestSubmit} className="space-y-6">
         
          {/* ===== CAMPO 1: SELETOR DE PSICÓLOGO ===== */}
          <div>
            {/* LABEL COM ÍCONE */}
            {/* LAYOUT: flex items-center = alinha ícone e texto horizontalmente */}
            {/* ESPAÇAMENTO: gap-2 = 0.5rem entre ícone e texto */}
            {/* TIPOGRAFIA: text-lg (18px), font-medium (500) */}
            <label className="flex items-center gap-2 text-lg font-medium text-dark mb-3">
              {/* ÍCONE DECORATIVO */}
              {/* TAMANHO: w-5 h-5 = 20x20px */}
              {/* PORQUE: Melhora identificação visual do campo */}
              <Bell className="w-5 h-5" />
              Escolha o Psicólogo
            </label>
           
            {/* SELECT ESTILIZADO */}
            {/* CONTROLLED COMPONENT: value + onChange = React controla o valor */}
            {/* ESTILO: Fundo semi-transparente, bordas sutis, foco destacado */}
            {/* ACESSIBILIDADE: required = campo obrigatório */}
            <select
              value={selectedPsychologist}  // Estado atual
              onChange={(e) => setSelectedPsychologist(e.target.value)}  // Atualiza estado
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
              required
            >
              {/* OPÇÃO PADRÃO */}
              {/* value="" = valor vazio para forçar seleção */}
              <option value="">Selecione um psicólogo</option>
             
              {/* RENDERIZAÇÃO DINÂMICA */}
              {/* CONCEITO: map() transforma array de dados em array de JSX */}
              {/* KEY: React precisa de identificador único para otimizar re-renders */}
              {psychologists.map(psych => (
                <option key={psych.id} value={psych.id}>
                  {psych.name} - {psych.specialty}
                </option>
              ))}
            </select>
 
                <InfoBalloon type="info">
                    sua solicitação será enviada ao psicologo. Ele entrará em contato se aceitar.
                </InfoBalloon>
 
          </div>
 
          {/* ===== CAMPO 2: DESCRIÇÃO DA NECESSIDADE ===== */}
          <div>
            {/* LABEL COM INDICADOR DE OBRIGATÓRIO */}
            {/* ASTERISCO: Convenção universal para campos obrigatórios */}
            {/* PORQUE: Usuário sabe quais campos deve preencher */}
            <label className="block text-lg font-medium text-dark mb-3">
              Descreva sua necessidade *
            </label>
           
            {/* TEXTAREA PARA TEXTO LONGO */}
            {/* CONTROLLED COMPONENT: value vem do estado, onChange atualiza estado */}
            {/* SPREAD OPERATOR: {...requestData} mantém outros campos, só muda description */}
            {/* PORQUE: Permite texto longo, melhor que input simples */}
            <textarea
              value={requestData.description}  // Valor atual do estado
              onChange={(e) => setRequestData({...requestData, description: e.target.value})}  // Atualiza só description
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
              rows={4}  // Altura inicial de 4 linhas
              placeholder="Ex: Gostaria de ser seu paciente. Preciso de ajuda com ansiedade, tenho disponibilidade nas manhãs de segunda a quarta..."
              required  // HTML5 validation
            />
          </div>
 
          {/* ===== CAMPO 3: NÍVEL DE URGÊNCIA ===== */}
          <div>
            {/* LABEL SIMPLES */}
            {/* SEM ASTERISCO: Campo opcional, tem valor padrão */}
            <label className="block text-lg font-medium text-dark mb-3">
              Nível de Urgência
            </label>
           
            {/* SELECT COM OPÇÕES PRÉ-DEFINIDAS */}
            {/* VALORES CONTROLADOS: baixa/media/alta para padronização */}
            {/* PADRÃO: 'media' definido no estado inicial */}
            {/* PORQUE: Ajuda psicólogo a priorizar solicitações */}
            <select
              value={requestData.urgency}  // Valor atual (padrão: 'media')
              onChange={(e) => setRequestData({...requestData, urgency: e.target.value})}  // Atualiza só urgency
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
            >
              {/* OPÇÕES COM DESCRIÇÕES CLARAS */}
              {/* PORQUE: Usuário entende exatamente o que cada nível significa */}
              <option value="baixa">Baixa - Posso aguardar</option>
              <option value="media">Média - Prefiro em breve</option>
              <option value="alta">Alta - Preciso urgentemente</option>
            </select>
          </div>
 
          {/* ===== CARD INFORMATIVO CONDICIONAL ===== */}
          {/* RENDERIZAÇÃO CONDICIONAL: só aparece se psicólogo foi selecionado */}
          {/* OPERADOR &&: se selectedPsychologist for truthy, renderiza o JSX */}
          {/* PORQUE: Feedback contextual - mostra info relevante apenas quando necessário */}
          {selectedPsychologist && (
            <Card className="bg-blue-50"> {/* Card aninhado com fundo azul claro */}
              {/* TÍTULO DA SEÇÃO */}
              <h3 className="font-semibold text-dark mb-2">Informações Importantes</h3>
             
              <div className="space-y-2 text-sm text-dark/70">
                {/* BUSCA DINÂMICA DE DADOS */}
                {/* FIND: procura psicólogo na lista pelo ID */}
                {/* PARSEINT: converte string do select para número */}
                {/* OPTIONAL CHAINING (?.): previne erro se não encontrar */}
                <p><strong>Psicólogo selecionado:</strong> {psychologists.find(p => p.id === parseInt(selectedPsychologist))?.name}</p>
                <p><strong>Especialidade:</strong> {psychologists.find(p => p.id === parseInt(selectedPsychologist))?.specialty}</p>
               
                {/* CAIXA EXPLICATIVA */}
                {/* HIERARQUIA VISUAL: Fundo mais escuro para destacar informação importante */}
                {/* PORQUE: Explica o processo para reduzir ansiedade do usuário */}
                <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Como funciona:</strong> Sua solicitação será enviada ao psicólogo. Se aceita, ele entrará em contato para agendar as sessões nos horários que funcionem para ambos.
                  </p>
                </div>
              </div>
            </Card>
          )}
 
          {/* ===== ÁREA DE BOTÕES ===== */}
          {/* LAYOUT FLEXÍVEL: Botões lado a lado com espaçamento igual */}
          {/* gap-4: espaçamento de 1rem entre botões */}
          <div className="flex gap-4">
           
            {/* BOTÃO CANCELAR */}
            {/* type="button": previne submit do formulário */}
            {/* variant="secondary": estilo visual menos destacado */}
            {/* onClick: navegação programática sem submit */}
            {/* flex-1: ocupa metade do espaço disponível */}
            {/* PORQUE: Sempre dar opção de sair sem salvar */}
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/dashboard')}  // Volta para dashboard
              className="flex-1"
            >
              Cancelar
            </Button>
           
            {/* BOTÃO ENVIAR */}
            {/* type="submit": dispara evento onSubmit do form */}
            {/* loading: mostra spinner e desabilita durante envio */}
            {/* disabled: desabilita se campos obrigatórios estão vazios */}
            {/* LÓGICA: !selectedPsychologist OR !description = botão desabilitado */}
            {/* PORQUE: Previne envio de dados incompletos */}
            <Button
              type="submit"
              loading={submitting}  // Estado de carregamento
              className="flex-1"
              disabled={!selectedPsychologist || !requestData.description}  // Validação visual
            >
              Enviar Solicitação
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
 