import Transaction from "@/interfaces/Transaction";
import { deleteTransaction, getAllTransactions } from "@/services/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Popconfirm, Space, Table, Typography, message } from "antd"
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

const { Title } = Typography;

interface TransactionsTableModalProps {
  open: boolean;
  onClose: () => void;
  onEditTransaction: (transaction: Transaction) => void;
}

const TransactionsTableModal = ({open, onClose, onEditTransaction} : TransactionsTableModalProps) => {

const queryClient = useQueryClient();

// Utilisation du hook useQuery de React Query pour récupérer les données
const { data } = useQuery<Transaction[], Error>({
    queryKey: ['transactionsTable'], // Clé de la requête
    queryFn: () => getAllTransactions()
});

const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['transactionsTable'] });
        queryClient.invalidateQueries({ queryKey: ['walletHistory'] });
        queryClient.invalidateQueries({ queryKey: ['cryptoAssets'] });
        message.success("Transaction supprimée avec succès !");
    },

    onError: (error) => {
        message.error(`Erreur : ${error.message}.`);
    },
})

const handleDelete = (id: string | undefined) => {
    if(id == undefined) {
        return
    }
    deleteMutation.mutate(id);
}

const handleEdit = (value: Transaction) => {
    onEditTransaction(value)
}

const columns: ColumnsType<Transaction> = [
    {
        title: 'Date',
        dataIndex: 'dateTransaction',
        key: 'date',
        render: (dateTransaction: number) => {
            return dayjs(dateTransaction * 1000).format('DD-MM-YYYY')
        } 
    },
    {
        title: 'Description',
        dataIndex: 'token',
        key: 'token'
    },
    {
        title: 'Montant',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => amount.toFixed(2)
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                    <Button 
                        icon={<EditOutlined />} 
                        type="link" 
                        onClick={() => handleEdit(record)} // <-- Nouvelle fonction
                        size="small"
                    />

                    <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer cette transaction ?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Oui"
                        cancelText="Non"
                    >
                    <Button 
                        icon={<DeleteOutlined />} 
                        danger 
                        type="text" 
                        size="small"
                        loading={deleteMutation.isPending}
                    />
                    </Popconfirm>
                </Space>
        )
    }
]

    const handleCancel = () => {
        onClose()
    }

    return (
        <Modal
        className=""
            title={<Title level={4} style={{ textAlign: 'center', margin: 0 }}>Ensemble des transactions</Title>}
            open={open}
            onCancel={handleCancel}
                        footer={[ // Vous pouvez personnaliser les boutons du footer                
                <Button key="back" onClick={handleCancel}>
                    Annuler
                </Button>               
            ]}
        >
            <Table 
                rowKey="id"
                dataSource={data}
                columns={columns}
                >
                
            </Table>
        </Modal>
    )
}

export default TransactionsTableModal