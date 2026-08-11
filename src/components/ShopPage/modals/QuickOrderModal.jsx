import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import ActionButton from '../ActionButton'
import { ACTION, SCREEN } from '../../../shop/taxonomy'
import { getProduct, getProductImage, UPSELL_IDS } from '../../../shop/catalog'
import { formatPrice } from '../../../shop/hooks'
import { buildOrder } from '../../../shop/order'
import { trackEcommerce } from '../../../shop/analytics'
import { addToCart, createOrder } from '../../../store/shop/shopSlice'

// Быстрый заказ мимо корзины: QUICK_ORDER + допродажа ADD_TO_CART в модалке
function QuickOrderModal({ open, onClose, product }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [phone, setPhoneValue] = useState('')
  const upsell = getProduct(UPSELL_IDS.find((id) => id !== product?.id) || UPSELL_IDS[0])

  if (!product) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    const order = buildOrder({
      items: [{ ...product, quantity: 1 }],
      total: product.price,
      customer: { phone },
      source: 'quick'
    })
    dispatch(createOrder(order))
    trackEcommerce('purchase', order.items, { actionField: { id: order.id, revenue: order.total } })
    onClose()
    navigate(`/shop/orders/${order.id}`)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      screen={SCREEN.POPUP}
      title="Покупка в 1 клик"
      subtitle="Оставьте телефон — менеджер подтвердит заказ, остальное заполнять не нужно"
    >
      <div className="shop-modal-product">
        <img src={getProductImage(product.id, 120, 90)} alt={product.title} />
        <div>
          <p className="shop-modal-product__title">{product.title}</p>
          <p className="shop-modal-product__price">{formatPrice(product.price)}</p>
        </div>
      </div>

      <form className="shop-form" onSubmit={handleSubmit}>
        <label className="shop-field">
          <span>Телефон для подтверждения</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhoneValue(event.target.value)}
            placeholder="+7 (900) 000-00-00"
            required
          />
        </label>
        <ActionButton
          screen={SCREEN.POPUP}
          action={ACTION.QUICK_ORDER}
          slot="submit"
          type="submit"
          product={product}
          value={product.price}
        />
      </form>

      {upsell && (
        <div className="shop-upsell">
          <p className="shop-upsell__title">Часто берут вместе</p>
          <div className="shop-upsell__item">
            <img src={getProductImage(upsell.id, 80, 60)} alt={upsell.title} />
            <div className="shop-upsell__info">
              <span>{upsell.title}</span>
              <strong>{formatPrice(upsell.price)}</strong>
            </div>
            <ActionButton
              screen={SCREEN.POPUP}
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
    </Modal>
  )
}

export default QuickOrderModal
