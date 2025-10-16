import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Bell, User, Clock, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Solicitacoes = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  useEffect(() => {
    loadRequests();
  }, [user.id]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getRequests(user.id);
      const pendingRequests = data.filter(req => req.status === 'pendente');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, requestData) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      const existingPatients = await mockApi.getPatients(user.id);
      const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);

      if (duplicatePatient) {
        toast.error('Este paciente já está cadastrado!');
        return;
      }

      await mockApi.createPatient({
        name: requestData.patientName,
        email: requestData.patientEmail,
        phone: requestData.patientPhone,
        birthDate: '1990-01-01',
        age: 30,
        status: 'Ativo',
        psychologistId: user.id
      });

      await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação aceita!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      await mockApi.updateRequestStatus(requestId, 'rejeitado', 'Solicitação rejeitada');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação rejeitada.');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      {/* Cabeçalho com sino pulsando */}
      <div className="flex items-center gap-3">
        <Bell className="w-10 h-10 text-green-600 animate-pulse" />
        <h1 className="text-2xl font-bold text-green-600">Notificações de Solicitação</h1>
      </div>

      <div className="flex flex-col gap-4">
        {requests.length === 0 ? (
          <Card className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-2 animate-pulse" />
            <h3 className="text-lg font-semibold text-gray-700">Sem novas solicitações</h3>
            <p className="text-gray-500">Novos pacientes aparecerão aqui.</p>
          </Card>
        ) : (
          requests.map(request => (
            <Card key={request.id} className="p-4 flex flex-col gap-3 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{request.patientName}</h3>
                    <p className="text-sm text-gray-500">{request.patientEmail}</p>
                    <p className="text-sm text-gray-500">{request.patientPhone}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                  {request.urgency === 'alta' ? 'Alta' : request.urgency === 'media' ? 'Média' : 'Baixa'}
                </span>
              </div>

              <p className="text-gray-600 text-sm">{request.description}</p>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handleRejectRequest(request.id)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Rejeitar
                </Button>
                <Button
                  onClick={() => handleAcceptRequest(request.id, request)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Aceitar
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
