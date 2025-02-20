import { Button } from "antd"
import Loader from "@/components/loader/Loader"
import "./SubmitButton.css"

interface Props {
  type?: string
  label?: string
  disabled?: boolean
  scrollToTop?: boolean
  loading?: boolean
  onClick: () => void
}

const SubmitButton = ({
  type = "primary",
  label = "Étape suivante",
  disabled = false,
  scrollToTop = true,
  loading = false,
  onClick,
  ...props
}: Props) => {
  const onClickWithScroll = () => {
    onClick()
    if (scrollToTop) {
      window.scrollTo(0, 0)
    }
  }

  return (
    <Button
      className="submit-button"
      type="primary"
      disabled={disabled}
      onClick={onClickWithScroll}
      {...props}
    >
      {loading ? <Loader size={"small"} /> : label}
    </Button>
  )
}

export default SubmitButton
