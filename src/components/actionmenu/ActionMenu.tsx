import { Button, Space } from "antd"
import { useNavigate } from "react-router-dom"

const ActionMenu = () => {
    const navigate = useNavigate()

    const handleConsulterWallet = () => {
        navigate('/wallet-details')
        console.log("Naviguer vers la page de consultation du wallet.")
    }

    const handleAddTransaction = () => {
        navigate('/dashboard/transaction')
        console.log("Ouvrir une modale ou naviguer pour ajouter une transaction.")
    }

    const handleDeleteTransaction = () => {
        console.log("Ouvrir une modale ou naviguer pour supprimer une transaction.")
    }

    return(
        <Space direction="horizontal">
            <Button type="primary" block onClick={handleConsulterWallet}>
                Consulter Wallet
            </Button>
            <Button block onClick={handleAddTransaction}>
                Ajouter une transaction
            </Button>
            <Button block danger onClick={handleDeleteTransaction}>
                Supprimer une transaction
            </Button>
        </Space>
    )
}

export default ActionMenu