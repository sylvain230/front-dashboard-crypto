import { Button, DatePicker, Form, Input, Modal, Select } from "antd"
import { useEffect } from "react";
import dayjs from 'dayjs'; // N'oubliez pas d'installer dayjs: npm install dayjs


const { Option } = Select

// Interface pour les données de la transaction
interface TransactionFormData {
    description: string
    amount: number
    type: 'income' | 'expense' | 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'transfer'
    date: string
    category?: string // Optionnel
    asset? : string // BTC, ETH, ...
    curency?: string // USD, EUR, ...
}

interface AddTransactionModalProps {
  open: boolean; // Prop pour contrôler l'ouverture/fermeture
  onClose: () => void; // Fonction à appeler pour fermer la modale
  onFinish: (values: any) => void; // Fonction à appeler quand le formulaire est soumis
  initialData?: Partial<TransactionFormData> // Pour pré-remplir le formulaire si nécessaire (ex: modification)
}

const AddTransactionModal = ({ open, onClose, onFinish, initialData }: AddTransactionModalProps) => {
    const [form] = Form.useForm() // Hook pour contrôler le formulaire

    // Initialiser/réinitialiser le formulaire quand la modale s'ouvre ou que les données initiales changent
    useEffect(() => {
        if (open) {
            form.resetFields() // Réinitialise les champs quand la modale s'ouvre
            if (initialData) {
                // Si des données initiales sont fournies, les mettre dans le formulaire
                form.setFieldsValue({
                    ...initialData,
                    date: initialData.date ? dayjs(initialData.date) : undefined, // Convertir la date en objet dayjs
                })
            }
        }
    }, [open, initialData, form])

    const handleOk = () => {
        form.validateFields() // Valide tous les champs du formulaire
            .then(values => {
            // Ici, vous pouvez ajuster les valeurs avant de les envoyer, par exemple formater la date
            const formattedValues = {
                ...values,
                date: values.date ? values.date.format('YYYY-MM-DD') : undefined
            }
            onFinish(formattedValues) // Appelle la fonction onFinish passée en prop
            form.resetFields(); // Réinitialise le formulaire après soumission
            })
            .catch(exception => {
                console.log("Validation Failed : ", exception)
            })
    }

    const handleCancel = () => {
        form.resetFields() // Réinitialise le formulaire si on annule
        onClose() // Ferme la modale
    }

    return(
        <Modal
            title="Ajouter une nouvelle transaction"            
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[ // Vous pouvez personnaliser les boutons du footer
                <>
                <Button key="back" onClick={handleCancel}>
                    Annuler
                </Button>
                <Button key="submit" onClick={handleOk}>
                    Ajouter
                </Button>
                </>
            ]}
        >

                <Form
                form={form} // Lie le formulaire à l'instance de form créée par useForm
                layout="vertical" // Pour que les labels soient au dessus des inputs
                name="add_transaction_form"
                onFinish={handleOk}
                initialValues={{ type: 'expense'}} // Valeur par défaut pour le type de transaction
                >
                    <Form.Item
                        name="type"
                        label="Type de transaction"
                        rules={[{ required: true, message: 'Veuillez sélectionner le type !'}]}
                    >
                        <Select placeholder="Sélectionner le type">
                            <Option value="deposit">Dépôt</Option>
                            <Option value="withdrawal">Retrait</Option>
                            <Option value="buy">Achat</Option>
                            <Option value="sell">Vente</Option>
                            <Option value="transfer">Transfert</Option>
                            <Option value="income">Revenu (générique)</Option>
                            <Option value="expense">Dépense (générique)</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="asset" label="Actif (ex: BTC, ETH)">
                        <Input placeholder="BTC, ETH, ..."/>
                    </Form.Item>

                    <Form.Item name="amount" label="Montant">
                        <Input style={{width: '100%'}} placeholder="0.00" min={0}/>
                    </Form.Item>

                    <Form.Item name="currency" label="Devise (si applicable, ex: USD, EUR)">
                    <Input placeholder="USD, EUR..." />
                    </Form.Item>                    

                    <Form.Item
                        name="date"
                        label="Date de la transaction"
                        rules={[{required: true, message: 'Veuillez sélectionner la date !'}]}>
                        <DatePicker style={{width: '100%'}} format="YYYY-MM-DD"/>
                    </Form.Item>
                
                </Form>
            Hello modal
        </Modal>
    )
}

export default AddTransactionModal