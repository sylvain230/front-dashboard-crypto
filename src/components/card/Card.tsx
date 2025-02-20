import type { ReactNode } from "react"
import "./Card.css"
import { ArrowBackIcon } from "@/icons"
import { Button } from "antd"

interface Props {
  title: string
  goBack?: () => void
  actions?: ReactNode
  hasRequired?: boolean
  className?: string
  children: ReactNode
}

const Card = ({ title, goBack, actions, hasRequired = false, className, children }: Props) => {
  const canGoBack = goBack !== undefined
  const hasActions = actions !== undefined

  return (
    <div className={"card" + (className !== undefined ? ` ${className}` : "")}>
      <div className={"card-title-container" + (canGoBack ? "" : " centered")}>
        {canGoBack && <Button type="primary" icon={<ArrowBackIcon />} className="card-title-button" onClick={goBack}>
          Retour
        </Button>}
        <h2 className="card-title">{title}</h2>
        <div className="card-title-filling" />
      </div>
      <div className="card-content">
        {children}
      </div>
      {hasRequired && <div className="card-mandatory-fields mandatory-field">Champs obligatoires</div>}
      {hasActions && <div className="card-actions">
        {actions}
      </div>}
    </div>
  )
}

export default Card
