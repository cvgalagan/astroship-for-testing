import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActionButton from './ActionButton'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { ORDER_STATUS, ORDER_STATUS_TITLES, ORDER_SOURCE_TITLES } from '../../shop/order'
import { formatPrice } from '../../shop/hooks'
import { markOrderPaid, selectOrders } from '../../store/shop/shopSlice'

// История заказов — тоже order_details: заказы уже созданы
function OrdersPage() {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)

  if (orders.length === 0) {
    return (
      <div className="shop-page" data-screen-type={SCREEN.ORDER_DETAILS}>
        <h1 className="shop-title">Мои заказы</h1>
        <p className="shop-note">
          Заказов пока нет. Оформите обычный заказ через корзину или быстрый — в 1 клик.
        </p>
        <Link to="/shop" className="shop-link">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="shop-page" data-screen-type={SCREEN.ORDER_DETAILS}>
      <h1 className="shop-title">Мои заказы</h1>

      <div className="shop-orders">
        {orders.map((order) => (
          <article key={order.id} className="shop-order-row" data-order-id={order.id}>
            <div className="shop-order-row__main">
              <Link to={`/shop/orders/${order.id}`} className="shop-order-row__number">
                Заказ {order.number}
              </Link>
              <span className="shop-note">
                {new Date(order.createdAt).toLocaleString('ru-RU')} ·{' '}
                {ORDER_SOURCE_TITLES[order.source] || order.source} · {order.items.length} поз.
              </span>
            </div>
            <span className={`shop-status shop-status--${order.status}`}>
              {ORDER_STATUS_TITLES[order.status]}
            </span>
            <span className="shop-order-row__total">{formatPrice(order.total)}</span>
            {order.status === ORDER_STATUS.AWAITING_PAYMENT && (
              <ActionButton
                screen={SCREEN.ORDER_DETAILS}
                action={ACTION.PAY_CREATED_ORDER}
                slot="list"
                value={order.total}
                onClick={() => dispatch(markOrderPaid(order.id))}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
