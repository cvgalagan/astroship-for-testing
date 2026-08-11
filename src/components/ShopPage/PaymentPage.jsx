import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActionButton from './ActionButton'
import OtpModal from './modals/OtpModal'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { UPSELL_IDS, getProduct, getProductImage } from '../../shop/catalog'
import { formatPrice, useLabels } from '../../shop/hooks'
import { trackEcommerce } from '../../shop/analytics'
import { addToCart, markOrderPaid, selectLastOrder } from '../../store/shop/shopSlice'

const METHODS = [
  { id: 'card', title: 'Банковской картой', hint: 'Visa, Mastercard, МИР' },
  { id: 'sbp', title: 'СБП', hint: 'По QR-коду или в приложении банка' },
  { id: 'cash', title: 'Наличными при получении', hint: 'Комиссия 0 ₽' }
]

// Финальный шаг воронки: подтверждение оплаты уже созданного черновика заказа
function PaymentPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order = useSelector(selectLastOrder)
  const t = useLabels()
  const [method, setMethod] = useState('card')
  const [otpOpen, setOtpOpen] = useState(false)

  const upsell = getProduct(UPSELL_IDS[0])

  if (!order) {
    return (
      <div className="shop-page" data-screen-type={SCREEN.PAYMENT}>
        <h1 className="shop-title">Оплата</h1>
        <p className="shop-note">Нет заказа для оплаты — сначала оформите его в корзине.</p>
        <Link to="/shop/cart" className="shop-link">
          Перейти в корзину
        </Link>
      </div>
    )
  }

  const handlePay = () => {
    dispatch(markOrderPaid(order.id))
    trackEcommerce('purchase', order.items, {
      actionField: { id: order.id, revenue: order.total, payment_method: method }
    })
    navigate(`/shop/orders/${order.id}`)
  }

  return (
    <div className="shop-page" data-screen-type={SCREEN.PAYMENT}>
      <nav className="shop-steps">
        <Link to="/shop/cart" className="shop-steps__item">
          1. Корзина
        </Link>
        <Link to="/shop/checkout" className="shop-steps__item">
          2. Оформление
        </Link>
        <span className="shop-steps__item is-active">3. Оплата</span>
      </nav>

      <h1 className="shop-title">Оплата заказа {order.number}</h1>

      <div className="shop-checkout">
        <div className="shop-checkout__form">
          <fieldset className="shop-fieldset">
            <legend>Способ оплаты</legend>
            {METHODS.map((item) => (
              <label key={item.id} className="shop-radio">
                <input
                  type="radio"
                  name="payment-method"
                  value={item.id}
                  checked={method === item.id}
                  onChange={(event) => setMethod(event.target.value)}
                />
                <span>
                  {item.title}
                  <em className="shop-note"> — {item.hint}</em>
                </span>
              </label>
            ))}
          </fieldset>

          {method === 'card' && (
            <div className="shop-form">
              <label className="shop-field">
                <span>Номер карты</span>
                <input type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" />
              </label>
              <div className="shop-form__row">
                <label className="shop-field">
                  <span>Срок действия</span>
                  <input type="text" placeholder="MM/ГГ" />
                </label>
                <label className="shop-field">
                  <span>CVC</span>
                  <input type="password" maxLength={3} placeholder="123" />
                </label>
              </div>
            </div>
          )}

          <div className="shop-form__submit">
            <span className="shop-form__total">К оплате: {formatPrice(order.total)}</span>
            <ActionButton
              screen={SCREEN.PAYMENT}
              action={ACTION.PLACE_ORDER}
              slot="main"
              value={order.total}
              label={`${t(SCREEN.PAYMENT, ACTION.PLACE_ORDER, 'main')} ${formatPrice(order.total)}`}
              onClick={handlePay}
            />
          </div>
        </div>

        <aside className="shop-summary">
          <h2 className="shop-subtitle">Состав заказа</h2>
          {order.items.map((item) => (
            <div key={item.id} className="shop-summary__row">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="shop-summary__row shop-summary__row--total">
            <span>Итого</span>
            <span>{formatPrice(order.total)}</span>
          </div>

          <div className="shop-summary__block">
            <p className="shop-subtitle-sm">Электронный чек</p>
            <p className="shop-note">
              Чек придёт на телефон и почту — подтвердите контакт, чтобы он не потерялся.
            </p>
            <ActionButton
              screen={SCREEN.PAYMENT}
              action={ACTION.VERIFY_CONTACT}
              slot="receipt"
              kind="ghost"
              onClick={() => setOtpOpen(true)}
            />
          </div>

          {upsell && (
            <div className="shop-summary__block">
              <p className="shop-subtitle-sm">Успеваем добавить</p>
              <div className="shop-upsell__item">
                <img src={getProductImage(upsell.id, 80, 60)} alt={upsell.title} />
                <div className="shop-upsell__info">
                  <span>{upsell.title}</span>
                  <strong>{formatPrice(upsell.price)}</strong>
                </div>
                <ActionButton
                  screen={SCREEN.PAYMENT}
                  action={ACTION.ADD_TO_CART}
                  slot="upsell"
                  kind="secondary"
                  product={upsell}
                  onClick={() => {
                    dispatch(addToCart({ id: upsell.id }))
                    trackEcommerce('add', [{ ...upsell, quantity: 1 }])
                  }}
                />
              </div>
            </div>
          )}
        </aside>
      </div>

      <OtpModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        title="Контакт для чека"
        subtitle="Отправим электронный чек после оплаты"
      />
    </div>
  )
}

export default PaymentPage
