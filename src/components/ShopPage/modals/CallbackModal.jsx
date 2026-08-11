import { useState } from 'react'
import Modal from '../Modal'
import ActionButton from '../ActionButton'
import { ACTION, SCREEN } from '../../../shop/taxonomy'

// Заявка на звонок: SUBMIT_LEAD в чистом виде — без цены и без покупки
function CallbackModal({ open, onClose, subject }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })

  const handleClose = () => {
    setSent(false)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      screen={SCREEN.POPUP}
      title="Заказать обратный звонок"
      subtitle={subject ? `Вопрос по товару: ${subject}` : 'Перезвоним в течение 15 минут'}
    >
      {sent ? (
        <p className="shop-success">Заявка принята, менеджер перезвонит в рабочее время.</p>
      ) : (
        <form
          className="shop-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <label className="shop-field">
            <span>Как к вам обращаться</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Иван"
              required
            />
          </label>
          <label className="shop-field">
            <span>Телефон</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="+7 (900) 000-00-00"
              required
            />
          </label>
          <p className="shop-note">Консультация бесплатная, оплата на этом шаге не требуется.</p>
          <ActionButton
            screen={SCREEN.POPUP}
            action={ACTION.SUBMIT_LEAD}
            slot="callback"
            type="submit"
          />
        </form>
      )}
    </Modal>
  )
}

export default CallbackModal
