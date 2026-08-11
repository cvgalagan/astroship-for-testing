import { useEffect } from 'react'
import { Link, NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DebugHud from './DebugHud'
import { LABEL_VARIANTS } from '../../shop/labels'
import { TOTAL_COVERAGE } from '../../shop/taxonomy'
import { isDebugEnabled } from '../../shop/analytics'
import { useCart } from '../../shop/hooks'
import {
  resetShop,
  selectCoverage,
  selectLabelVariant,
  setLabelVariant
} from '../../store/shop/shopSlice'
import './ShopPage.css'

function ShopLayout() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const variant = useSelector(selectLabelVariant)
  const coverage = useSelector(selectCoverage)
  const { count } = useCart()
  const covered = Object.keys(coverage).length

  // ?variant=b — второй вход для автотестов и прямых ссылок,
  // основной способ переключения всё равно в интерфейсе
  const variantFromUrl = searchParams.get('variant')
  useEffect(() => {
    if (variantFromUrl && LABEL_VARIANTS.some((item) => item.id === variantFromUrl)) {
      dispatch(setLabelVariant(variantFromUrl))
    }
  }, [variantFromUrl, dispatch])

  return (
    <div className="shop">
      <header className="shop-header">
        <div className="shop-header__brand">
          <Link to="/shop" className="shop-header__logo">
            Витрина
          </Link>
          <span className="shop-header__tag">тестовый магазин</span>
        </div>

        <nav className="shop-header__nav">
          <NavLink to="/shop" end className="shop-header__link">
            Каталог
          </NavLink>
          <NavLink to="/shop/cart" className="shop-header__link">
            Корзина{count > 0 && <span className="shop-header__badge">{count}</span>}
          </NavLink>
          <NavLink to="/shop/orders" className="shop-header__link">
            Заказы
          </NavLink>
          <NavLink to="/shop/coverage" className="shop-header__link">
            Покрытие<span className="shop-header__badge">{covered} / {TOTAL_COVERAGE}</span>
          </NavLink>
        </nav>

        <div className="shop-header__tools">
          <div className="shop-variant" role="group" aria-label="Вариант лейблов">
            {LABEL_VARIANTS.map((item) => (
              <button
                key={item.id}
                type="button"
                title={item.hint}
                className={`shop-variant__btn ${variant === item.id ? 'is-active' : ''}`}
                onClick={() => dispatch(setLabelVariant(item.id))}
              >
                {item.title}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="shop-reset"
            onClick={() => {
              if (window.confirm('Очистить корзину, заказы и прогресс покрытия?')) {
                dispatch(resetShop())
              }
            }}
          >
            Сбросить стенд
          </button>
        </div>
      </header>

      <Outlet />

      {isDebugEnabled() && <DebugHud />}
    </div>
  )
}

export default ShopLayout
