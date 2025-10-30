import { useQuery } from '@tanstack/react-query'; // Pour le fetching de données
import { Card, Flex } from 'antd';
import { CartesianGrid,  ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from 'recharts';
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
<Card title="Graphique global du wallet dans le temps" style={{ marginBottom: 24 }}>
    <Flex justify="center" align="center" style={{ height: 250, width: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
            {/* Remplacer LineChart par AreaChart */}
            <AreaChart data={data}>
                {/* Définition du dégradé (Gradient) */}
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        {/* Couleur au sommet (plus opaque) */}
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        {/* Couleur à la base (transparente) */}
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                
                <CartesianGrid stroke="#4a4a4a" strokeDasharray="3 3"/>
                <XAxis 
                    dataKey="date" 
                    stroke="#e0e0e0" 
                    // Optionnel: Formatage des labels de l'axe X si la date n'est pas déjà formatée
                    // tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis stroke="#e0e0e0" />
                
                <Tooltip 
                    formatter={(value: number) => `$${value.toFixed(2)}`} 
                    contentStyle={{ backgroundColor: '#3a3a3a', borderColor: '#4a4a4a', color: '#e0e0e0' }}
                    itemStyle={{ color: '#82ca9d' }} // Couleur de la valeur dans le tooltip
                />
                
                {/* Remplacer Line par Area */}
                <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#82ca9d" 
                    fill="url(#colorValue)" // Utilise le dégradé défini ci-dessus
                    fillOpacity={1}
                    activeDot={{ r: 6 }} // Taille du point au survol
                />
            </AreaChart>
        </ResponsiveContainer>
    </Flex>
</Card>
    )
}

export default GlobalWalletChart