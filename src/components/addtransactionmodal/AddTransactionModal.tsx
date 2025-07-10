import { Button, Form, Modal } from "antd"

interface AddTransactionModalProps {
  open: boolean; // Prop pour contrôler l'ouverture/fermeture
  onClose: () => void; // Fonction à appeler pour fermer la modale
  onFinish: (values: any) => void; // Fonction à appeler quand le formulaire est soumis
}

const AddTransactionModal = ({ open, onClose, onFinish }: AddTransactionModalProps) => {
    const [form] = Form.useForm() // Hook pour contrôler le formulaire

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
    }

    const handleCancel = () => {
        form.resetFields() // Réinitialise le formulaire si on annule
        onClose()
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
                form={form}> (// Lie le formulaire à l'instance de form créée par useForm)

                </Form>
            Hello modal
        </Modal>
    )
}

export default AddTransactionModal