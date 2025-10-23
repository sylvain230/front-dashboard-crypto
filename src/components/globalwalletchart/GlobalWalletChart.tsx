import { useQuery } from '@tanstack/react-query'; // Pour le fetching de données
import { Card, Flex } from 'antd';
import { CartesianGrid, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,Line } from 'recharts';
import ChartDataPoint from '@/interfaces/ChartDataPoint';
import { getPortfolioHistoryByUserId } from '@/services/transaction';

const GlobalWalletChart = () => {
    
    const { data, isLoading, error, isError } = useQuery<ChartDataPoint[], Error>({
        queryKey: ['walletHistory'], // On utilise l'ID pour isoler le cache utilisateur
        queryFn: () => getPortfolioHistoryByUserId()
    });

    if (isLoading) {
        return <Card title="Graphique global du wallet dans le temps">Chargement du graphique ...</Card>
    }

    if (isError) {
        return <Card title="Graphique global du wallet dans le temps">Erreur lors du chargement du graphique: {error?.message}</Card>

    }

    if (!data || data.length === 0) {
        return <Card title="Graphique global du wallet dans le temps">Chargement du graphique ...</Card>

    }

    return (
        <Card title="Graphique global du wallet dans le temps"  style={{ marginBottom: 24 }}>
            <Flex justify="center" align="center" style={{ height: 250, width: 500 }}> {/* Ajustez la hauteur ici si nécessaire */}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid stroke="#4a4a4a" strokeDasharray="3 3"/>
                        <XAxis dataKey="date" stroke="#e0e0e0" />
                        <YAxis stroke="#e0e0e0" />
                        <Tooltip 
                            formatter={(value: number) => `$${value.toFixed(2)}`} 
                            contentStyle={{ backgroundColor: '#3a3a3a', borderColor: '#4a4a4a', color: '#e0e0e0' }} // Style du tooltip
                            itemStyle={{ color: '#e0e0e0' }} // Style des éléments dans le tooltip
                        />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }}/>
                    </LineChart>
                </ResponsiveContainer>
            </Flex>
        </Card>
    )
}

export default GlobalWalletChart