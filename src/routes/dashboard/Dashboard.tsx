import { FormInstance, Layout, message, Row } from 'antd';
import GlobalWalletChart from '@/components/globalwalletchart/GlobalWalletChart';
import ActionMenu from '@/components/actionmenu/ActionMenu';
import styles from '@/routes/dashboard/Dashboard.module.css';
import CryptoHoldingsTable from '@/components/cryptoholdingstable/CryptoHoldingsTable';
import { useRef, useState } from 'react';
import AddTransactionModal from '@/components/addtransactionmodal/AddTransactionModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTransaction } from '@/services/transaction';
import Transaction from '@/interfaces/Transaction';

const { Header, Content } = Layout

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la visibilité de la modale
    const queryClient = useQueryClient();
    const formRef = useRef<FormInstance>(null);

    const transactionMutation = useMutation({
        mutationFn: postTransaction, // La fonction asynchrone qui effectue le POST
        
        onSuccess: () => {
            // 1. Afficher une notification de succès
            message.success('Transaction ajoutée et enregitrée !');
            
            // 2. Invalider la cache pour forcer le rafraîchissement des données du Dashboard
            //    (Ex: la table des crypto-monnaies ou le graphique)
            queryClient.invalidateQueries({ queryKey: ['walletHistory'] }); 
            queryClient.invalidateQueries({ queryKey: ['cryptoAssets'] }); 

            if (formRef.current) {
                formRef.current.resetFields();
            }

            // 3. Fermer la modale (après le succès)
            setIsModalOpen(false);
            resetFields(); // Réinitialise le formulaire après soumission
        },

        onError: (error) => {
            // Afficher une notification d'erreur
            console.error("Erreur lors de la soumission :", error);
            message.error(`Erreur: Impossible d'ajouter la transaction. ${error.message || ''}`);
        },
    });

    const handleAddTransactionClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        if (!transactionMutation.isPending) {
            setIsModalOpen(false)
        }
    }

    const handleFormSubmit = (values: any) => {
        console.log("Ici on gère l'appel au backend avec les valeurs suivantes : ", values)
            const transactionToSend: Transaction = {
                token: values.asset, 
                amount: Number(values.amount), 
                date: new Date(values.date),
            }
        transactionMutation.mutate(transactionToSend)
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

            {isModalOpen && (
            <AddTransactionModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onFinish={handleFormSubmit}
                isLoading={transactionMutation.isPending}
            />            
            )}

        </Layout>
    )
}

export default Dashboard

function resetFields() {
    throw new Error('Function not implemented.');
}
