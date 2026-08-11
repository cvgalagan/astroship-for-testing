import Modal from '../Modal'
import CheckoutForm from '../CheckoutForm'
import { SCREEN } from '../../../shop/taxonomy'

// Полная форма оформления внутри модалки. По спецификации такой экран
// размечается как "checkout", а не как "popup" — отдельный кейс на проверку.
function CheckoutModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      screen={SCREEN.CHECKOUT}
      title="Оформление заказа"
      subtitle="Заполните данные доставки — заказ создастся сразу после подтверждения"
    >
      <CheckoutForm slot="modal" compact onSubmitted={onClose} />
    </Modal>
  )
}

export default CheckoutModal
