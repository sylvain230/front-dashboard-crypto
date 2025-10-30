import { FormInstance, Layout, message, Row } from 'antd';
import GlobalWalletChart from '@/components/globalwalletchart/GlobalWalletChart';
import ActionMenu from '@/components/actionmenu/ActionMenu';
import styles from '@/routes/dashboard/Dashboard.module.css';
import CryptoHoldingsTable from '@/components/cryptoholdingstable/CryptoHoldingsTable';
import { useRef, useState } from 'react';
import AddTransactionModal from '@/components/addtransactionmodal/AddTransactionModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTransaction, putTransaction } from '@/services/transaction';
import Transaction from '@/interfaces/Transaction';
import TransactionsTableModal from '@/components/transactionstablemodal/TransactionsTableModal';
import { useAuth } from '@/auth/useAuth';

const { Header, Content } = Layout

const Dashboard = () => {
    const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] = useState(false);
    const [isModalShowTransactionsOpen, setIsModalShowTransactionsOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction>();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const formRef = useRef<FormInstance>(null);

    const transactionMutationPost = useMutation({
        mutationFn: postTransaction, // La fonction asynchrone qui effectue le POST
        
        onSuccess: () => {
            // 1. Afficher une notification de succès
            message.success('Transaction ajoutée et enregistrée !');
            
            // 2. Invalider la cache pour forcer le rafraîchissement des données du Dashboard
            //    (Ex: la table des crypto-monnaies ou le graphique)
            // refetchType: 'all' est nécessaire car le tableau n'est pas affiché. Il n'est pas dans le DOM donc pas rafraichi
            queryClient.invalidateQueries({ queryKey: ['transactionsTable'], refetchType: 'all'});
            queryClient.invalidateQueries({ queryKey: ['walletHistory'] });
            queryClient.invalidateQueries({ queryKey: ['cryptoAssets'] });

            if (formRef.current) {
                formRef.current.resetFields();
            }

            // 3. Fermer la modale (après le succès)
            setIsModalAddTransactionOpen(false);
        },

        onError: (error) => {
            // Afficher une notification d'erreur
            console.error("Erreur lors de la soumission :", error);
            message.error(`Erreur: Impossible d'ajouter la transaction. ${error.message || ''}`);
        },
    });

        const transactionMutationPut = useMutation({
        mutationFn: putTransaction, // La fonction asynchrone qui effectue le POST
        
        onSuccess: () => {
            // 1. Afficher une notification de succès
            message.success('Transaction ajoutée et enregistrée !');
            
            // 2. Invalider la cache pour forcer le rafraîchissement des données du Dashboard
            //    (Ex: la table des crypto-monnaies ou le graphique)
            // refetchType: 'all' est nécessaire car le tableau n'est pas affiché. Il n'est pas dans le DOM donc pas rafraichi
            queryClient.invalidateQueries({ queryKey: ['transactionsTable'], refetchType: 'all' });
            queryClient.invalidateQueries({ queryKey: ['walletHistory'] });
            queryClient.invalidateQueries({ queryKey: ['cryptoAssets'] });

            if (formRef.current) {
                formRef.current.resetFields();
            }

            // 3. Fermer la modale (après le succès)
            setIsModalAddTransactionOpen(false);
        },

        onError: (error) => {
            // Afficher une notification d'erreur
            console.error("Erreur lors de la soumission :", error);
            message.error(`Erreur: Impossible d'ajouter la transaction. ${error.message || ''}`);
        },
    });

    const handleAddTransactionClick = () => {
        setEditingTransaction(undefined)
        setIsModalAddTransactionOpen(true)
    }

    const handleAddShowTransactionClick = () => {
        setIsModalShowTransactionsOpen(true)
    }

    const handleCloseAddTransactionModal = () => {
        if (!transactionMutationPut.isPending || transactionMutationPost.isPending) {
            setIsModalAddTransactionOpen(false)
        }
    }

    const handleCloseShowTransactionsModal = () => {
        setIsModalShowTransactionsOpen(false)
    }

    const handleLogout = () => {
        auth.logout();
    }

    const handleFormSubmit = (values: any) => {
        const isEditMode = !!editingTransaction;
        console.log("Ici on gère l'appel au backend avec les valeurs suivantes : ", values)
            const transactionToSend: Transaction = {
                token: values.asset, 
                amount: Number(values.amount), 
                dateTransaction: values.date,
            }
        if(isEditMode) {
            transactionToSend.id = editingTransaction.id
            transactionMutationPut.mutate(transactionToSend)
        } else {
            transactionMutationPost.mutate(transactionToSend)
        }
    }

    const handleEditTransaction = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsModalAddTransactionOpen(true);
    }

    return (
        <Layout className={styles.dashboardLayout}>
            <Header className={styles.dashboardHeader}>
                <div className={styles.headerContent}>
                    <ActionMenu 
                        onAddTransactionClick={handleAddTransactionClick} 
                        onShowTransactions={handleAddShowTransactionClick}
                        logout={handleLogout}
                        />
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

                <Row justify="center">
                        {/* Assurez-vous que CryptoHoldingsTable n'est PAS commenté ici ! */}
                        <CryptoHoldingsTable />
                </Row>
            </Content>

            {isModalAddTransactionOpen && (
            <AddTransactionModal
                open={isModalAddTransactionOpen}
                onClose={handleCloseAddTransactionModal}
                onFinish={handleFormSubmit}
                initialData={editingTransaction}
                isLoading={transactionMutationPost.isPending || transactionMutationPut.isPending}
            />            
            )}

            {isModalShowTransactionsOpen &&
            <TransactionsTableModal
                open={isModalShowTransactionsOpen}
                onClose={handleCloseShowTransactionsModal}
                onEditTransaction={handleEditTransaction}
            />
            }

        </Layout>
    )
}

export default Dashboard