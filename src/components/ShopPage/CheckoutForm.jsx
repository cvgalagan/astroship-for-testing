import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ActionButton from './ActionButton'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { formatPrice, useCart } from '../../shop/hooks'
import { buildOrder } from '../../shop/order'
import { trackEcommerce } from '../../shop/analytics'
import { clearCart, createOrder } from '../../store/shop/shopSlice'

// Форма оформления. Используется и как страница, и внутри модалки —
// по спецификации в обоих случаях это screen_type = "checkout".
function CheckoutForm({ slot = 'main', compact = false, onSubmitted }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, isEmpty } = useCart()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Москва',
    address: '',
    delivery: 'courier',
    comment: '',
    offer: true
  })

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isEmpty) return
    const order = buildOrder({ items, total, customer: form, source: 'checkout' })
    dispatch(createOrder(order))
    dispatch(clearCart())
    trackEcommerce('purchase', order.items, { actionField: { id: order.id, revenue: order.total } })
    onSubmitted?.(order)
    navigate('/shop/payment')
  }

  if (isEmpty) {
    return <p className="shop-note">Корзина пуста — добавьте товар, чтобы оформить заказ.</p>
  }

  return (
    <form className="shop-form" onSubmit={handleSubmit}>
      <div className="shop-form__row">
        <label className="shop-field">
          <span>Имя и фамилия</span>
          <input type="text" value={form.name} onChange={update('name')} required />
        </label>
        <label className="shop-field">
          <span>Телефон</span>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+7 (900) 000-00-00"
            required
          />
        </label>
      </div>

      <div className="shop-form__row">
        <label className="shop-field">
          <span>E-mail</span>
          <input type="email" value={form.email} onChange={update('email')} required />
        </label>
        <label className="shop-field">
          <span>Город</span>
          <input type="text" value={form.city} onChange={update('city')} required />
        </label>
      </div>

      <label className="shop-field">
        <span>Адрес доставки</span>
        <input
          type="text"
          value={form.address}
          onChange={update('address')}
          placeholder="Улица, дом, квартира"
          required
        />
      </label>

      {!compact && (
        <>
          <fieldset className="shop-fieldset">
            <legend>Способ доставки</legend>
            <label className="shop-radio">
              <input
                type="radio"
                name={`delivery-${slot}`}
                value="courier"
                checked={form.delivery === 'courier'}
                onChange={update('delivery')}
              />
              <span>Курьер, завтра — 390 ₽</span>
            </label>
            <label className="shop-radio">
              <input
                type="radio"
                name={`delivery-${slot}`}
                value="pickup"
                checked={form.delivery === 'pickup'}
                onChange={update('delivery')}
              />
              <span>Самовывоз из пункта выдачи — бесплатно</span>
            </label>
          </fieldset>

          <label className="shop-field">
            <span>Комментарий к заказу</span>
            <textarea rows={3} value={form.comment} onChange={update('comment')} />
          </label>
        </>
      )}

      <label className="shop-checkbox">
        <input type="checkbox" checked={form.offer} onChange={update('offer')} required />
        <span>Согласен с условиями оферты и обработкой персональных данных</span>
      </label>

      <div className="shop-form__submit">
        <span className="shop-form__total">К оплате: {formatPrice(total)}</span>
        <ActionButton
          screen={SCREEN.CHECKOUT}
          action={ACTION.PLACE_ORDER}
          slot={slot}
          type="submit"
          value={total}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
