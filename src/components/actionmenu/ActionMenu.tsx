import { Button, Space } from "antd"
import { useNavigate } from "react-router-dom"
import styles from "@/components/actionmenu/ActionMenu.module.css"

interface MenuHautProps {
    onAddTransactionClick: () => void // Nouvelle prop pour le clic sur "Ajouter"
}

const ActionMenu = ({ onAddTransactionClick }: MenuHautProps) => {
    const navigate = useNavigate()

    const handleConsulterWallet = () => {
        navigate('/wallet-details')
        console.log("Naviguer vers la page de consultation du wallet.")
    }

    const handleDeleteTransaction = () => {
        console.log("Ouvrir une modale ou naviguer pour supprimer une transaction.")
    }

    return(
        <Space direction="horizontal" className={styles.actionMenuContainer}>
            <Button type="primary" block onClick={handleConsulterWallet}>
                Consulter Wallet
            </Button>
            <Button block onClick={onAddTransactionClick}>  {/* <<< UTILISEZ LA NOUVELLE PROP ICI */}
                Ajouter une transaction
            </Button>
            <Button block danger onClick={handleDeleteTransaction}>
                Supprimer une transaction
            </Button>
        </Space>
    )
}

export default ActionMenu