import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal'
import ActionButton from '../ActionButton'
import { ACTION, SCREEN } from '../../../shop/taxonomy'
import { joinLoyalty, selectLoyalty } from '../../../store/shop/shopSlice'

// Вступление в бонусную программу: JOIN_LOYALTY внутри модалки
function LoyaltyModal({ open, onClose }) {
  const dispatch = useDispatch()
  const loyalty = useSelector(selectLoyalty)
  const [form, setForm] = useState({ name: '', phone: '', birthday: '' })

  return (
    <Modal
      open={open}
      onClose={onClose}
      screen={SCREEN.POPUP}
      title="Клуб покупателей"
      subtitle="5% бонусами с каждой покупки и ранний доступ к распродажам"
    >
      {loyalty.joined ? (
        <p className="shop-success">Карта оформлена, бонусы начнут копиться со следующего заказа.</p>
      ) : (
        <form
          className="shop-form"
          onSubmit={(event) => {
            event.preventDefault()
            dispatch(joinLoyalty())
          }}
        >
          <label className="shop-field">
            <span>Имя</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label className="shop-field">
            <span>Телефон</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="+7 (900) 000-00-00"
              required
            />
          </label>
          <label className="shop-field">
            <span>Дата рождения</span>
            <input
              type="date"
              value={form.birthday}
              onChange={(event) => setForm({ ...form, birthday: event.target.value })}
            />
          </label>
          <ActionButton
            screen={SCREEN.POPUP}
            action={ACTION.JOIN_LOYALTY}
            slot="submit"
            type="submit"
          />
        </form>
      )}
    </Modal>
  )
}

export default LoyaltyModal
