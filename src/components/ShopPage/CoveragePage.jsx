import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  COVERAGE_MATRIX,
  SCREEN,
  SCREEN_TITLES,
  TOTAL_COVERAGE,
  coverageKey
} from '../../shop/taxonomy'
import { PRODUCTS } from '../../shop/catalog'
import { resetCoverage, selectCoverage, selectOrders } from '../../store/shop/shopSlice'

// Служебная страница: какие пары screen_type × action_type уже прокликаны.
// Отметка ставится в момент клика по кнопке, а не по факту перехода.
function CoveragePage() {
  const dispatch = useDispatch()
  const coverage = useSelector(selectCoverage)
  const orders = useSelector(selectOrders)
  const covered = Object.keys(coverage).length

  const linkFor = (screen) => {
    switch (screen) {
      case SCREEN.PRODUCT_GALLERY:
        return '/shop'
      case SCREEN.PRODUCT_CARD:
        return `/shop/product/${PRODUCTS[0].id}`
      case SCREEN.CART:
        return '/shop/cart'
      case SCREEN.CHECKOUT:
        return '/shop/checkout'
      case SCREEN.PAYMENT:
        return '/shop/payment'
      case SCREEN.ORDER_DETAILS:
        return orders[0] ? `/shop/orders/${orders[0].id}` : '/shop/orders'
      default:
        return null
    }
  }

  return (
    <div className="shop-page">
      <div className="shop-page__head">
        <h1 className="shop-title">Покрытие разметки</h1>
        <button type="button" className="shop-reset" onClick={() => dispatch(resetCoverage())}>
          Сбросить отметки
        </button>
      </div>

      <p className="shop-note">
        Обязательных пар: {TOTAL_COVERAGE}. Прокликано: {covered}. Модалки отмечаются как{' '}
        <code>popup</code>, кроме формы оформления в модальном окне — она размечена как{' '}
        <code>checkout</code>.
      </p>

      <div className="shop-progress">
        <div
          className="shop-progress__bar"
          style={{ width: `${Math.round((covered / TOTAL_COVERAGE) * 100)}%` }}
        />
      </div>

      {COVERAGE_MATRIX.map(({ screen, where, actions }) => {
        const link = linkFor(screen)
        return (
          <section key={screen} className="shop-coverage">
            <h2 className="shop-subtitle">
              {SCREEN_TITLES[screen]} · <code>{screen}</code>
              {link ? (
                <Link to={link} className="shop-coverage__link">
                  {where}
                </Link>
              ) : (
                <span className="shop-coverage__link">{where}</span>
              )}
            </h2>
            <table className="shop-coverage__table">
              <tbody>
                {actions.map(({ action, hint }) => {
                  const done = Boolean(coverage[coverageKey(screen, action)])
                  return (
                    <tr key={action} className={done ? 'is-done' : ''}>
                      <td className="shop-coverage__mark">{done ? '✓' : '—'}</td>
                      <td>
                        <code>{action}</code>
                      </td>
                      <td>{hint}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        )
      })}

      <section className="shop-coverage">
        <h2 className="shop-subtitle">Ловушки на приоритет правил</h2>
        <ul className="shop-traps">
          <li>
            Чекаут: кнопка «Отправить заявку» — это <code>PLACE_ORDER</code>, а не{' '}
            <code>SUBMIT_LEAD</code>, потому что шаг внутри воронки покупки.
          </li>
          <li>
            Корзина: «Оформить в одном окне» открывает модалку с полной формой — экран остаётся{' '}
            <code>checkout</code>, а не <code>popup</code>.
          </li>
          <li>
            Вариант B: «Оформить заказ» стоит и на корзине (<code>BEGIN_CHECKOUT</code>), и на
            чекауте (<code>PLACE_ORDER</code>) — одинаковый текст, разные действия.
          </li>
          <li>
            Вариант B: «Оплатить» встречается на оплате (<code>PLACE_ORDER</code>) и в заказе (
            <code>PAY_CREATED_ORDER</code>).
          </li>
          <li>
            Каталог: «Сообщить о поступлении» рядом с ценой — всё ещё <code>SUBMIT_LEAD</code>,
            покупки не происходит.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default CoveragePage
