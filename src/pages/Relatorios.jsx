import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react';

export const Relatorios = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [reportsData, setReportsData] = useState(null);

    useEffect(() => {
        const loadReportsData = async () => {
            try {
                const data = await mockApi.getReportsData(user.id);
                setReportsData(data);
            } catch (error) {
                console.error('Erro ao carregar dados dos relatórios:', error);
            } finally {
                setLoading(false);
            }
        };
        loadReportsData();
    }, [user.id]);

    if (loading) return <LoadingSpinner size="lg" />;
    if (!reportsData) return <div className="text-black">Erro ao carregar dados</div>;

    const { stats, frequencyData, statusData, riskAlerts, patientsData } = reportsData;
    const hasNoData = stats.activePatients === 0 && stats.totalSessions === 0;

    const cardClasses = "bg-green-900 text-black rounded-3xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-1 transition-all";

    // Definindo cores verdes e preto para os gráficos de pizza
    const greenPalette = ["#00FF7F", "#006400"]; // verde claro e verde escuro

    return (
        <div className="space-y-6">
            <div className="text-center text-black">
                <h1 className="text-3xl font-bold mb-2">Relatórios e Analytics</h1>
                <p className="text-black/70">Acompanhe métricas e indicadores da sua prática</p>
            </div>

            {hasNoData ? (
                <Card className={`${cardClasses} text-center border-2 border-dashed border-green-700`}>
                    <BarChart3 className="w-16 h-16 text-black/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Relatórios em Construção</h3>
                    <p className="text-black/70 mb-4">
                        Seus relatórios e analytics aparecerão aqui conforme você atender pacientes e realizar sessões.
                    </p>
                    <p className="text-sm text-black/50">
                        Comece aceitando solicitações de pacientes para gerar dados estatísticos.
                    </p>
                </Card>
            ) : (
                <>
                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className={cardClasses}>
                            <Users className="w-8 h-8 text-black mx-auto mb-2" />
                            <h3 className="text-2xl font-bold">{stats.activePatients}</h3>
                            <p className="text-black/70 text-sm">Pacientes Ativos</p>
                        </Card>

                        <Card className={cardClasses}>
                            <Calendar className="w-8 h-8 text-black mx-auto mb-2" />
                            <h3 className="text-2xl font-bold">{stats.totalSessions}</h3>
                            <p className="text-black/70 text-sm">Total de Sessões</p>
                        </Card>

                        <Card className={cardClasses}>
                            <TrendingUp className="w-8 h-8 text-black mx-auto mb-2" />
                            <h3 className="text-2xl font-bold">{stats.attendanceRate}%</h3>
                            <p className="text-black/70 text-sm">Taxa de Conclusão</p>
                        </Card>

                        <Card className={cardClasses}>
                            <AlertTriangle className="w-8 h-8 text-black mx-auto mb-2" />
                            <h3 className="text-2xl font-bold">{stats.riskAlerts}</h3>
                            <p className="text-black/70 text-sm">Alertas de Risco</p>
                        </Card>
                    </div>

                    {/* Gráficos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4">Frequência de Sessões</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={frequencyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#00000040" />
                                    <XAxis dataKey="month" stroke="#000000" />
                                    <YAxis stroke="#000000" />
                                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', color: 'black' }} />
                                    <Bar dataKey="sessions" fill="#00FF7F" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>

                        <Card className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4">Status das Sessões</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={greenPalette[index % greenPalette.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', color: 'black' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>

                        <Card className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4 text-center">Pacientes por Status de Sessão</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={patientsData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {patientsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={greenPalette[index % greenPalette.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>

                        <Card className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-800">
                                <AlertTriangle className="w-5 h-5 text-green-800" />
                                Alertas de Risco
                            </h2>
                            <div className="space-y-3">
                                {riskAlerts.length === 0 ? (
                                    <>
                                        <p className="text-white text-center py-4">Nenhum alerta de risco no momento</p>
                                        <p className="text-white text-center">Todos os agendamentos estão em dia!</p>
                                    </>
                                ) : (
                                    riskAlerts.map(alert => (
                                        <div key={alert.id} className="flex justify-between items-center p-4 bg-green-800 rounded-xl shadow-sm">
                                            <div>
                                                <p className="font-medium text-white">{alert.patient}</p>
                                                <p className="text-sm text-white">{alert.reason}</p>
                                            </div>
                                            <div className="text-right">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${alert.risk === 'Alto'
                                                            ? 'bg-red-500/30 text-white'
                                                            : 'bg-yellow-500/30 text-white'
                                                        }`}
                                                >
                                                    Risco {alert.risk}
                                                </span>
                                                <p className="text-xs text-white mt-1">{new Date(alert.date).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
};
