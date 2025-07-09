import { Layout, Row } from 'antd';
import GlobalWalletChart from '@/components/globalwalletchart/GlobalWalletChart';
import ActionMenu from '@/components/actionmenu/ActionMenu';
import styles from '@/routes/dashboard/Dashboard.module.css';
import CryptoHoldingsTable from '@/components/cryptoholdingstable/CryptoHoldingsTable';

const { Header, Content } = Layout;

const Dashboard = () => {
    return (
        <Layout className={styles.dashboardLayout}>
            <Header className={styles.dashboardHeader}>
                <div className={styles.headerContent}>
                { <ActionMenu /> }
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
        </Layout>
    )
}

export default Dashboard