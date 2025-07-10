import { Layout, Row } from 'antd';
import GlobalWalletChart from '@/components/globalwalletchart/GlobalWalletChart';
import ActionMenu from '@/components/actionmenu/ActionMenu';
import styles from '@/routes/dashboard/Dashboard.module.css';
import CryptoHoldingsTable from '@/components/cryptoholdingstable/CryptoHoldingsTable';
import { useState } from 'react';
import AddTransactionModal from '@/components/addtransactionmodal/AddTransactionModal';

const { Header, Content } = Layout

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la visibilité de la modale

    const handleAddTransactionClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleFormSubmit = (values: any) => {
        console.log("Ici on gère l'appel au backend avec les valeurs suivantes : ", values)
        setIsModalOpen(false)
    }

    return (
        <Layout className={styles.dashboardLayout}>
            <Header className={styles.dashboardHeader}>
                <div className={styles.headerContent}>
                    <ActionMenu onAddTransactionClick={handleAddTransactionClick} />
                </div>
            </Header>

            <Content className={styles.dashboardContent}>
                {/* Utilisation de Row/Col pour la disposition.
                    Le gutter={[24, 24]} ajoute un bon espacement.
                    xs={24} signifie 100% de largeur sur les très petits écrans.
                    lg={16} et lg={8} pour 2/3 et 1/3 sur les grands écrans.
                    Le "wrap" sur Row permet le passage à la ligne.
                */}
                <Row gutter={[24, 24]} wrap justify="center">
                    {/* Colonne du graphique */}
                        <GlobalWalletChart />
                </Row>

                <Row>
                        {/* Assurez-vous que CryptoHoldingsTable n'est PAS commenté ici ! */}
                        <CryptoHoldingsTable />
                </Row>
            </Content>

            <AddTransactionModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onFinish={handleFormSubmit}
            />
        </Layout>
    )
}

export default Dashboard