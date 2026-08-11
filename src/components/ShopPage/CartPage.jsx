import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActionButton from './ActionButton'
import QuickOrderModal from './modals/QuickOrderModal'
import CheckoutModal from './modals/CheckoutModal'
import OtpModal from './modals/OtpModal'
import LoyaltyModal from './modals/LoyaltyModal'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { UPSELL_IDS, getProduct, getProductImage } from '../../shop/catalog'
import { formatPrice, useCart } from '../../shop/hooks'
import { trackEcommerce } from '../../shop/analytics'
import {
  addToCart,
  removeFromCart,
  selectContact,
  selectLoyalty,
  setQuantity
} from '../../store/shop/shopSlice'

// Корзина: товары уже выбраны, но заказ ещё не создан
function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, isEmpty } = useCart()
  const contact = useSelector(selectContact)
  const loyalty = useSelector(selectLoyalty)
  const [quickOpen, setQuickOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [otpOpen, setOtpOpen] = useState(false)
  const [loyaltyOpen, setLoyaltyOpen] = useState(false)

  const upsell = UPSELL_IDS.map(getProduct).filter(
    (product) => product && !items.some((item) => item.id === product.id)
  )

  if (isEmpty) {
    return (
      <div className="shop-page" data-screen-type={SCREEN.CART}>
        <h1 className="shop-title">Корзина</h1>
        <p className="shop-note">Пока пусто. Добавьте товар из каталога, чтобы пройти воронку.</p>
        <Link to="/shop" className="shop-link">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="shop-page" data-screen-type={SCREEN.CART}>
      <h1 className="shop-title">Корзина</h1>

      <div className="shop-cart">
        <div className="shop-cart__items">
          {items.map((item) => (
            <article key={item.id} className="shop-cart__item">
              <img src={getProductImage(item.id, 160, 120)} alt={item.title} />
              <div className="shop-cart__info">
                <Link to={`/shop/product/${item.id}`} className="shop-cart__title">
                  {item.title}
                </Link>
                <span className="shop-note">{formatPrice(item.price)} за штуку</span>
              </div>
              <div className="shop-qty">
                <button
                  type="button"
                  onClick={() => dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  aria-label="Уменьшить количество"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => dispatch(setQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  aria-label="Увеличить количество"
                >
                  +
                </button>
              </div>
              <span className="shop-cart__sum">{formatPrice(item.sum)}</span>
              <button
                type="button"
                className="shop-cart__remove"
                onClick={() => {
                  dispatch(removeFromCart(item.id))
                  trackEcommerce('remove', [{ ...item }])
                }}
              >
                Удалить
              </button>
            </article>
          ))}

          <section className="shop-upsell shop-upsell--wide">
            <p className="shop-upsell__title">С этим товаром покупают</p>
            {upsell.map((product) => (
              <div key={product.id} className="shop-upsell__item">
                <img src={getProductImage(product.id, 80, 60)} alt={product.title} />
                <div className="shop-upsell__info">
                  <span>{product.title}</span>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
                <ActionButton
                  screen={SCREEN.CART}
                  action={ACTION.ADD_TO_CART}
                  slot="upsell"
                  kind="secondary"
                  product={product}
                  onClick={() => {
                    dispatch(addToCart({ id: product.id }))
                    trackEcommerce('add', [{ ...product, quantity: 1 }])
                  }}
                />
              </div>
            ))}
          </section>
        </div>

        <aside className="shop-summary">
          <h2 className="shop-subtitle">Итого</h2>
          <div className="shop-summary__row">
            <span>Товары</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="shop-summary__row">
            <span>Доставка</span>
            <span>390 ₽</span>
          </div>
          <div className="shop-summary__row shop-summary__row--total">
            <span>К оплате</span>
            <span>{formatPrice(total + 390)}</span>
          </div>

          <ActionButton
            screen={SCREEN.CART}
            action={ACTION.BEGIN_CHECKOUT}
            slot="main"
            className="shop-btn--wide"
            value={total}
            onClick={() => navigate('/shop/checkout')}
          />
          <ActionButton
            screen={SCREEN.CART}
            action={ACTION.BEGIN_CHECKOUT}
            slot="modal"
            kind="secondary"
            className="shop-btn--wide"
            label="Оформить в одном окне"
            onClick={() => setCheckoutOpen(true)}
          />
          <ActionButton
            screen={SCREEN.CART}
            action={ACTION.QUICK_ORDER}
            slot="express"
            kind="ghost"
            className="shop-btn--wide"
            onClick={() => setQuickOpen(true)}
          />

          <div className="shop-summary__block">
            <p className="shop-note">
              {contact.verified
                ? 'Телефон подтверждён — корзина забронирована на 24 часа'
                : 'Подтвердите телефон, чтобы забронировать товары на 24 часа'}
            </p>
            {!contact.verified && (
              <ActionButton
                screen={SCREEN.CART}
                action={ACTION.VERIFY_CONTACT}
                slot="reserve"
                kind="ghost"
                onClick={() => setOtpOpen(true)}
              />
            )}
          </div>

          <div className="shop-summary__block">
            <p className="shop-note">
              {loyalty.joined
                ? 'Бонусы за этот заказ начислим автоматически'
                : `Бонусная карта вернёт ${Math.round(total * 0.05).toLocaleString('ru-RU')} бонусов`}
            </p>
            {!loyalty.joined && (
              <ActionButton
                screen={SCREEN.CART}
                action={ACTION.JOIN_LOYALTY}
                slot="sidebar"
                kind="ghost"
                onClick={() => setLoyaltyOpen(true)}
              />
            )}
          </div>
        </aside>
      </div>

      <QuickOrderModal open={quickOpen} product={items[0]} onClose={() => setQuickOpen(false)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <OtpModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        title="Бронь корзины"
        subtitle="Пришлём код, чтобы закрепить товары за вами"
      />
      <LoyaltyModal open={loyaltyOpen} onClose={() => setLoyaltyOpen(false)} />
    </div>
  )
}

export default CartPage
