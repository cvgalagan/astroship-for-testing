import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActionButton from './ActionButton'
import CheckoutForm from './CheckoutForm'
import QuickOrderModal from './modals/QuickOrderModal'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { UPSELL_IDS, getProduct, getProductImage } from '../../shop/catalog'
import { formatPrice, useCart } from '../../shop/hooks'
import { trackEcommerce } from '../../shop/analytics'
import {
  addToCart,
  joinLoyalty,
  requestCode,
  selectContact,
  selectLoyalty,
  verifyContact
} from '../../store/shop/shopSlice'

// Оформление: воронка покупки, данные доставки и согласия.
// SUBMIT_LEAD здесь запрещён спецификацией — основная кнопка называется
// «Отправить заявку», но размечена как PLACE_ORDER. Это ловушка на приоритет.
function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, isEmpty } = useCart()
  const contact = useSelector(selectContact)
  const loyalty = useSelector(selectLoyalty)
  const [code, setCode] = useState('')
  const [quickOpen, setQuickOpen] = useState(false)

  const upsell = UPSELL_IDS.map(getProduct).filter(
    (product) => product && !items.some((item) => item.id === product.id)
  )[0]

  return (
    <div className="shop-page" data-screen-type={SCREEN.CHECKOUT}>
      <nav className="shop-steps">
        <Link to="/shop/cart" className="shop-steps__item">
          1. Корзина
        </Link>
        <span className="shop-steps__item is-active">2. Оформление</span>
        <span className="shop-steps__item">3. Оплата</span>
      </nav>

      <h1 className="shop-title">Оформление заказа</h1>

      <div className="shop-checkout">
        <div className="shop-checkout__form">
          <CheckoutForm slot="main" />
        </div>

        <aside className="shop-summary">
          <h2 className="shop-subtitle">Ваш заказ</h2>
          {items.map((item) => (
            <div key={item.id} className="shop-summary__row">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatPrice(item.sum)}</span>
            </div>
          ))}
          <div className="shop-summary__row shop-summary__row--total">
            <span>Итого</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="shop-summary__block">
            <p className="shop-subtitle-sm">Подтверждение телефона</p>
            {contact.verified ? (
              <p className="shop-success">Номер подтверждён.</p>
            ) : (
              <>
                <p className="shop-note">
                  Курьер свяжется по этому номеру — подтвердите его кодом из СМС.
                </p>
                {contact.codeSent && (
                  <label className="shop-field">
                    <span>Код из СМС</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      placeholder="1234"
                    />
                  </label>
                )}
                <div className="shop-inline-actions">
                  <ActionButton
                    screen={SCREEN.CHECKOUT}
                    action={ACTION.VERIFY_CONTACT}
                    slot="request"
                    kind="secondary"
                    onClick={() => dispatch(requestCode())}
                  />
                  <ActionButton
                    screen={SCREEN.CHECKOUT}
                    action={ACTION.VERIFY_CONTACT}
                    slot="submit"
                    kind="ghost"
                    disabled={!contact.codeSent}
                    onClick={() => dispatch(verifyContact())}
                  />
                </div>
              </>
            )}
          </div>

          <div className="shop-summary__block">
            <p className="shop-subtitle-sm">Бонусная программа</p>
            {loyalty.joined ? (
              <p className="shop-success">Карта уже оформлена, бонусы придут после доставки.</p>
            ) : (
              <>
                <label className="shop-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Хочу бонусную карту и {Math.round(total * 0.05).toLocaleString('ru-RU')} бонусов за заказ</span>
                </label>
                <ActionButton
                  screen={SCREEN.CHECKOUT}
                  action={ACTION.JOIN_LOYALTY}
                  slot="inline"
                  kind="ghost"
                  onClick={() => dispatch(joinLoyalty())}
                />
              </>
            )}
          </div>

          {upsell && (
            <div className="shop-summary__block">
              <p className="shop-subtitle-sm">Добавить к заказу</p>
              <div className="shop-upsell__item">
                <img src={getProductImage(upsell.id, 80, 60)} alt={upsell.title} />
                <div className="shop-upsell__info">
                  <span>{upsell.title}</span>
                  <strong>{formatPrice(upsell.price)}</strong>
                </div>
                <ActionButton
                  screen={SCREEN.CHECKOUT}
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

          <div className="shop-summary__block">
            <p className="shop-subtitle-sm">Некогда заполнять?</p>
            <p className="shop-note">Оформим экспресс-заказ по одному телефону.</p>
            <ActionButton
              screen={SCREEN.CHECKOUT}
              action={ACTION.QUICK_ORDER}
              slot="express"
              kind="ghost"
              disabled={isEmpty}
              onClick={() => setQuickOpen(true)}
            />
          </div>
        </aside>
      </div>

      {isEmpty && (
        <p className="shop-note">
          Чтобы пройти шаг целиком, <button type="button" className="shop-linklike" onClick={() => navigate('/shop')}>добавьте товар</button>.
        </p>
      )}

      <QuickOrderModal open={quickOpen} product={items[0]} onClose={() => setQuickOpen(false)} />
    </div>
  )
}

export default CheckoutPage
