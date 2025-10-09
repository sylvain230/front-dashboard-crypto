import CryptoAsset from "@/interfaces/CryptoAsset"
import { getAllCryptoAssets } from "@/services/token"
import { useQuery } from "@tanstack/react-query"
import { Card, Tag } from "antd"
import Table, { ColumnsType } from "antd/es/table"

const CryptoHoldingsTable = () => {
    const columns: ColumnsType<CryptoAsset> = [
        { title: 'Nom', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: 'Détenu', dataIndex: 'amount', key: 'amount', render: (amount: number) => amount.toFixed(4), sorter: (a,b) => a.amount - b.amount },
        { title: 'En dollars', dataIndex: 'usdValue', key: 'usdValue', render: (value: number) => `${value.toFixed(2)} $`, sorter: (a,b) => a.usdValue - b.usdValue },
        { title: 'Pourcentage', dataIndex: 'percentageOfPortfolio', key: 'percentageOfPortfolio', render: (percentage: number) => `${percentage.toFixed(2)} %`, sorter: (a,b) => a.percentageOfPortfolio - b.percentageOfPortfolio },
        { title: 'Tendance H24',
            dataIndex: 'trend24h',
            key: 'trend24h',
            render: (trend: number) => {
                const color = trend > 0 ? 'green' : (trend < 0 ? 'red' : 'gray');
                return <Tag color={color}>{trend > 0 ? + '+' : ''}{trend.toFixed(2)} %</Tag>
            }
          }

    ]


// Utilisation du hook useQuery de React Query pour récupérer les données
const { data, isLoading, isError, error } = useQuery<CryptoAsset[], Error>({
    queryKey: ['cryptoAssets'], // Clé de la requête
    queryFn: () => getAllCryptoAssets(userId)
});

// Affichage du chargement
if (isLoading) {
    return (
        <Card title="Vos actifs Crypto">
            Chargement des actifs ...
        </Card>
    );
}

// Affichage de l'erreur
if (isError) {
    return (
        <Card title="Vos actifs Crypto">
            Erreur lors du chargement des actifs : {error.message}
        </Card>
    )
}

// Si aucune donnée n'est disponible après chargement
if (!data || data.length === 0) {
    return (
        <Card title="Vos Actifs Crypto">
            Aucun actif crypto disponible.
        </Card>
    ) 
}

// Rendu de la table avec les données
return (
    // Style pour espacer du composant précédent (GlobalWalleChart)
    <Card title="Vos Actifs Crypto">
        <Table
            columns={columns}
            dataSource={data} // Les données sont directement passées ici
            rowKey="id" // Indispensable pour la performance de la table (chaque ligne a besoin d'une clé unique)
            pagination={{ pageSize:5 }} // Pagination avec 5 éléments par page
        />
    </Card>
)

};

export default CryptoHoldingsTable