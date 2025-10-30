import { Button, Space } from "antd"
import styles from "@/components/actionmenu/ActionMenu.module.css"

interface MenuHautProps {
    onAddTransactionClick: () => void // Nouvelle prop pour le clic sur "Ajouter"
    onShowTransactions: () => void
    logout: () => void
}

const ActionMenu = ({ onAddTransactionClick, onShowTransactions, logout }: MenuHautProps) => {
    return(
        <Space direction="horizontal" className={styles.actionMenuContainer}>
            <Button onClick={onAddTransactionClick}>
                Ajouter une transaction
            </Button>
            <Button  onClick={onShowTransactions}>
                Afficher les transactions
            </Button>
            <Button onClick={logout}>
                Se déconnecter
            </Button>
        </Space>
    )
}

export default ActionMenu