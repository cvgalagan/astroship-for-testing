import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ActionButton from './ActionButton'
import QuickOrderModal from './modals/QuickOrderModal'
import CallbackModal from './modals/CallbackModal'
import LoyaltyModal from './modals/LoyaltyModal'
import { ACTION, SCREEN } from '../../shop/taxonomy'
import { CATEGORIES, PRODUCTS, getProductImage } from '../../shop/catalog'
import { formatPrice } from '../../shop/hooks'
import { trackEcommerce } from '../../shop/analytics'
import { addToCart } from '../../store/shop/shopSlice'

// Каталог, он же product_gallery (PLP)
function GalleryPage() {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('all')
  const [quickProduct, setQuickProduct] = useState(null)
  const [leadProduct, setLeadProduct] = useState(null)
  const [loyaltyOpen, setLoyaltyOpen] = useState(false)

  const products =
    category === 'all' ? PRODUCTS : PRODUCTS.filter((item) => item.category === category)

  return (
    <div className="shop-page" data-screen-type={SCREEN.PRODUCT_GALLERY}>
      <div className="shop-banner">
        <div>
          <h2 className="shop-banner__title">Клуб покупателей «Витрина»</h2>
          <p className="shop-banner__text">
            5% бонусами с каждой покупки, ранний доступ к распродажам и бесплатная доставка
          </p>
        </div>
        <ActionButton
          screen={SCREEN.PRODUCT_GALLERY}
          action={ACTION.JOIN_LOYALTY}
          slot="banner"
          onClick={() => setLoyaltyOpen(true)}
        />
      </div>

      <div className="shop-page__head">
        <h1 className="shop-title">Каталог</h1>
        <div className="shop-filters">
          <button
            type="button"
            className={`shop-filter ${category === 'all' ? 'is-active' : ''}`}
            onClick={() => setCategory('all')}
          >
            Все товары
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`shop-filter ${category === item.id ? 'is-active' : ''}`}
              onClick={() => setCategory(item.id)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-grid">
        {products.map((product) => (
          <article key={product.id} className="shop-card" data-product-id={product.id}>
            <Link to={`/shop/product/${product.id}`} className="shop-card__image">
              <img src={getProductImage(product.id)} alt={product.title} loading="lazy" />
            </Link>
            <div className="shop-card__body">
              <Link to={`/shop/product/${product.id}`} className="shop-card__title">
                {product.title}
              </Link>
              <div className="shop-card__prices">
                <span className="shop-card__price">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="shop-card__old-price">{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              <div className="shop-card__rating">★ {product.rating}</div>

              {product.inStock ? (
                <div className="shop-card__actions">
                  <ActionButton
                    screen={SCREEN.PRODUCT_GALLERY}
                    action={ACTION.ADD_TO_CART}
                    slot="card"
                    product={product}
                    onClick={() => {
                      dispatch(addToCart({ id: product.id }))
                      trackEcommerce('add', [{ ...product, quantity: 1 }])
                    }}
                  />
                  <ActionButton
                    screen={SCREEN.PRODUCT_GALLERY}
                    action={ACTION.QUICK_ORDER}
                    slot="card"
                    kind="secondary"
                    product={product}
                    onClick={() => setQuickProduct(product)}
                  />
                </div>
              ) : (
                <div className="shop-card__actions">
                  <span className="shop-card__stock">Нет в наличии</span>
                  <ActionButton
                    screen={SCREEN.PRODUCT_GALLERY}
                    action={ACTION.SUBMIT_LEAD}
                    slot="notify"
                    kind="secondary"
                    onClick={() => setLeadProduct(product)}
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <QuickOrderModal
        open={Boolean(quickProduct)}
        product={quickProduct}
        onClose={() => setQuickProduct(null)}
      />
      <CallbackModal
        open={Boolean(leadProduct)}
        subject={leadProduct?.title}
        onClose={() => setLeadProduct(null)}
      />
      <LoyaltyModal open={loyaltyOpen} onClose={() => setLoyaltyOpen(false)} />
    </div>
  )
}

export default GalleryPage
