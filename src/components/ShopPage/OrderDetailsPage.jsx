import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActionButton from './ActionButton'
import CallbackModal from './modals/CallbackModal'
import OtpModal from './modals/OtpModal'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { ORDER_STATUS, ORDER_STATUS_TITLES, ORDER_SOURCE_TITLES } from '../../shop/order'
import { getProductImage } from '../../shop/catalog'
import { formatPrice } from '../../shop/hooks'
import { trackEcommerce } from '../../shop/analytics'
import {
  addToCart,
  joinLoyalty,
  markOrderPaid,
  markOrderReceived,
  selectContact,
  selectLoyalty,
  selectOrderById
} from '../../store/shop/shopSlice'

// Карточка созданного заказа: отложенная оплата, вопросы, повтор заказа
function OrderDetailsPage() {
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const order = useSelector(selectOrderById(orderId))
  const loyalty = useSelector(selectLoyalty)
  const contact = useSelector(selectContact)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [otpOpen, setOtpOpen] = useState(false)

  if (!order) {
    return (
      <div className="shop-page" data-screen-type={SCREEN.ORDER_DETAILS}>
        <p className="shop-note">Заказ не найден.</p>
        <Link to="/shop/orders" className="shop-link">
          Ко всем заказам
        </Link>
      </div>
    )
  }

  const repeatOrder = () => {
    order.items.forEach((item) => dispatch(addToCart({ id: item.id, quantity: item.quantity })))
    trackEcommerce('add', order.items)
  }

  return (
    <div className="shop-page" data-screen-type={SCREEN.ORDER_DETAILS}>
      <nav className="shop-breadcrumbs">
        <Link to="/shop/orders">Мои заказы</Link>
        <span>/</span>
        <span>Заказ {order.number}</span>
      </nav>

      <div className="shop-order-head">
        <div>
          <h1 className="shop-title">Заказ {order.number}</h1>
          <p className="shop-note">
            От {new Date(order.createdAt).toLocaleString('ru-RU')} ·{' '}
            {ORDER_SOURCE_TITLES[order.source] || order.source}
          </p>
        </div>
        <span className={`shop-status shop-status--${order.status}`}>
          {ORDER_STATUS_TITLES[order.status]}
        </span>
      </div>

      <div className="shop-checkout">
        <div className="shop-checkout__form">
          <section className="shop-order-items">
            {order.items.map((item) => (
              <article key={item.id} className="shop-cart__item">
                <img src={getProductImage(item.id, 160, 120)} alt={item.title} />
                <div className="shop-cart__info">
                  <Link to={`/shop/product/${item.id}`} className="shop-cart__title">
                    {item.title}
                  </Link>
                  <span className="shop-note">
                    {formatPrice(item.price)} × {item.quantity}
                  </span>
                </div>
                <span className="shop-cart__sum">{formatPrice(item.price * item.quantity)}</span>
              </article>
            ))}
            <div className="shop-summary__row shop-summary__row--total">
              <span>Сумма заказа</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </section>

          {order.status === ORDER_STATUS.AWAITING_PAYMENT && (
            <div className="shop-pay-banner">
              <div>
                <p className="shop-subtitle-sm">Заказ ждёт оплаты</p>
                <p className="shop-note">
                  Оплатите в течение 48 часов, иначе бронь товаров снимется автоматически.
                </p>
              </div>
              <ActionButton
                screen={SCREEN.ORDER_DETAILS}
                action={ACTION.PAY_CREATED_ORDER}
                slot="main"
                value={order.total}
                onClick={() => dispatch(markOrderPaid(order.id))}
              />
            </div>
          )}

          {order.status === ORDER_STATUS.PAID && (
            <p className="shop-success">Оплачено. Заказ передан в доставку.</p>
          )}
        </div>

        <aside className="shop-summary">
          <h2 className="shop-subtitle">Что можно сделать</h2>

          <div className="shop-summary__block">
            <p className="shop-note">Появились вопросы по составу или срокам доставки?</p>
            <ActionButton
              screen={SCREEN.ORDER_DETAILS}
              action={ACTION.SUBMIT_LEAD}
              slot="question"
              kind="secondary"
              onClick={() => setCallbackOpen(true)}
            />
          </div>

          <div className="shop-summary__block">
            <p className="shop-note">Понравился заказ — соберём такой же в корзине.</p>
            <ActionButton
              screen={SCREEN.ORDER_DETAILS}
              action={ACTION.ADD_TO_CART}
              slot="repeat"
              kind="secondary"
              onClick={repeatOrder}
            />
          </div>

          <div className="shop-summary__block">
            <p className="shop-note">
              {order.status === ORDER_STATUS.RECEIVED
                ? 'Получение подтверждено.'
                : 'Курьер назовёт код — введите его при получении.'}
            </p>
            {order.status !== ORDER_STATUS.RECEIVED && (
              <ActionButton
                screen={SCREEN.ORDER_DETAILS}
                action={ACTION.VERIFY_CONTACT}
                slot="receive"
                kind="ghost"
                onClick={() => setOtpOpen(true)}
              />
            )}
          </div>

          <div className="shop-summary__block">
            <p className="shop-note">
              {loyalty.joined
                ? 'Бонусы за заказ уже закреплены за вашей картой.'
                : `За этот заказ можно получить ${Math.round(order.total * 0.05).toLocaleString('ru-RU')} бонусов.`}
            </p>
            {!loyalty.joined && (
              <ActionButton
                screen={SCREEN.ORDER_DETAILS}
                action={ACTION.JOIN_LOYALTY}
                slot="bonus"
                kind="ghost"
                onClick={() => dispatch(joinLoyalty())}
              />
            )}
          </div>
        </aside>
      </div>

      <CallbackModal
        open={callbackOpen}
        subject={`заказ ${order.number}`}
        onClose={() => setCallbackOpen(false)}
      />
      <OtpModal
        open={otpOpen}
        onClose={() => {
          setOtpOpen(false)
          if (contact.verified) dispatch(markOrderReceived(order.id))
        }}
        title="Подтверждение получения"
        subtitle={`Код курьера по заказу ${order.number}`}
      />
    </div>
  )
}

export default OrderDetailsPage
