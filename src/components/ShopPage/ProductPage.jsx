import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActionButton from './ActionButton'
import QuickOrderModal from './modals/QuickOrderModal'
import CallbackModal from './modals/CallbackModal'
import LoyaltyModal from './modals/LoyaltyModal'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { PRODUCTS, getProduct, getProductImage } from '../../shop/catalog'
import { formatPrice } from '../../shop/hooks'
import { trackEcommerce } from '../../shop/analytics'
import { addToCart, selectLoyalty } from '../../store/shop/shopSlice'

// Карточка товара, она же product_card (PDP)
function ProductPage() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const loyalty = useSelector(selectLoyalty)
  const product = getProduct(productId)
  const [quickOpen, setQuickOpen] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [loyaltyOpen, setLoyaltyOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (product) trackEcommerce('detail', [product])
  }, [product])

  if (!product) {
    return (
      <div className="shop-page">
        <p className="shop-note">Товар не найден.</p>
        <Link to="/shop">Вернуться в каталог</Link>
      </div>
    )
  }

  const related = PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 3)

  return (
    <div className="shop-page" data-screen-type={SCREEN.PRODUCT_CARD}>
      <nav className="shop-breadcrumbs">
        <Link to="/shop">Каталог</Link>
        <span>/</span>
        <span>{product.title}</span>
      </nav>

      <div className="shop-pdp">
        <div className="shop-pdp__gallery">
          <img
            className="shop-pdp__image"
            src={getProductImage(`${product.id}-${activeImage}`, 640, 480)}
            alt={product.title}
          />
          <div className="shop-pdp__thumbs">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                type="button"
                className={`shop-pdp__thumb ${activeImage === index ? 'is-active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={getProductImage(`${product.id}-${index}`, 120, 90)} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="shop-pdp__info">
          <h1 className="shop-title">{product.title}</h1>
          <p className="shop-pdp__rating">★ {product.rating} · Артикул {product.id}</p>
          <p className="shop-pdp__description">{product.description}</p>

          <table className="shop-specs">
            <tbody>
              {product.specs.map(([name, value]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="shop-pdp__buy">
          <div className="shop-pdp__prices">
            <span className="shop-pdp__price">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="shop-card__old-price">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <p className="shop-pdp__stock">
            {product.inStock ? 'В наличии, доставим завтра' : 'Нет в наличии'}
          </p>

          <ActionButton
            screen={SCREEN.PRODUCT_CARD}
            action={ACTION.ADD_TO_CART}
            slot="main"
            product={product}
            className="shop-btn--wide"
            onClick={() => {
              dispatch(addToCart({ id: product.id }))
              trackEcommerce('add', [{ ...product, quantity: 1 }])
            }}
          />
          <ActionButton
            screen={SCREEN.PRODUCT_CARD}
            action={ACTION.QUICK_ORDER}
            slot="main"
            kind="secondary"
            className="shop-btn--wide"
            product={product}
            onClick={() => setQuickOpen(true)}
          />

          <div className="shop-pdp__lead">
            <p className="shop-note">Нужна консультация? Ответим на вопросы по товару.</p>
            <ActionButton
              screen={SCREEN.PRODUCT_CARD}
              action={ACTION.SUBMIT_LEAD}
              slot="callback"
              kind="ghost"
              onClick={() => setCallbackOpen(true)}
            />
          </div>

          <div className="shop-pdp__loyalty">
            <p className="shop-note">
              {loyalty.joined
                ? `Вы участник клуба — вернём ${Math.round(product.price * 0.05).toLocaleString('ru-RU')} бонусов`
                : `С бонусной картой вернули бы ${Math.round(product.price * 0.05).toLocaleString('ru-RU')} бонусов`}
            </p>
            {!loyalty.joined && (
              <ActionButton
                screen={SCREEN.PRODUCT_CARD}
                action={ACTION.JOIN_LOYALTY}
                slot="sidebar"
                kind="ghost"
                onClick={() => setLoyaltyOpen(true)}
              />
            )}
          </div>
        </aside>
      </div>

      <section className="shop-related">
        <h2 className="shop-subtitle">Похожие товары</h2>
        <div className="shop-grid shop-grid--compact">
          {related.map((item) => (
            <article key={item.id} className="shop-card">
              <Link to={`/shop/product/${item.id}`} className="shop-card__image">
                <img src={getProductImage(item.id)} alt={item.title} loading="lazy" />
              </Link>
              <div className="shop-card__body">
                <Link to={`/shop/product/${item.id}`} className="shop-card__title">
                  {item.title}
                </Link>
                <span className="shop-card__price">{formatPrice(item.price)}</span>
                <ActionButton
                  screen={SCREEN.PRODUCT_CARD}
                  action={ACTION.ADD_TO_CART}
                  slot="related"
                  kind="secondary"
                  product={item}
                  onClick={() => {
                    dispatch(addToCart({ id: item.id }))
                    trackEcommerce('add', [{ ...item, quantity: 1 }])
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuickOrderModal open={quickOpen} product={product} onClose={() => setQuickOpen(false)} />
      <CallbackModal
        open={callbackOpen}
        subject={product.title}
        onClose={() => setCallbackOpen(false)}
      />
      <LoyaltyModal open={loyaltyOpen} onClose={() => setLoyaltyOpen(false)} />
    </div>
  )
}

export default ProductPage
