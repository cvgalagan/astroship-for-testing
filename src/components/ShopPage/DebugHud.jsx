import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { COVERAGE_MATRIX, SCREEN, SCREEN_TITLES, coverageKey } from '../../shop/taxonomy'
import { selectCoverage } from '../../store/shop/shopSlice'

// Какой screen_type ожидается на текущем маршруте
function screenForPath(pathname) {
  if (pathname.startsWith('/shop/product/')) return SCREEN.PRODUCT_CARD
  if (pathname.startsWith('/shop/orders')) return SCREEN.ORDER_DETAILS
  if (pathname === '/shop/cart') return SCREEN.CART
  if (pathname === '/shop/checkout') return SCREEN.CHECKOUT
  if (pathname === '/shop/payment') return SCREEN.PAYMENT
  if (pathname === '/shop' || pathname === '/shop/') return SCREEN.PRODUCT_GALLERY
  return null
}

// Панель с ожидаемой разметкой текущего экрана. Включается через ?debug=1
function DebugHud() {
  const location = useLocation()
  const coverage = useSelector(selectCoverage)
  const [domActions, setDomActions] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  const screen = screenForPath(location.pathname)
  const expected = useMemo(
    () => COVERAGE_MATRIX.find((row) => row.screen === screen)?.actions || [],
    [screen]
  )

  useEffect(() => {
    const scan = () => {
      const found = Array.from(document.querySelectorAll('[data-action-type]')).map((node) => ({
        screen: node.dataset.screenType,
        action: node.dataset.actionType,
        slot: node.dataset.slot || '',
        label: node.textContent.trim()
      }))
      // перерисовываем панель только когда набор кнопок реально изменился
      setDomActions((prev) =>
        JSON.stringify(prev) === JSON.stringify(found) ? prev : found
      )
    }
    scan()
    const timer = window.setInterval(scan, 1000)
    return () => window.clearInterval(timer)
  }, [location.pathname])

  if (!screen) return null

  return (
    <aside className={`shop-hud ${collapsed ? 'shop-hud--collapsed' : ''}`}>
      <button type="button" className="shop-hud__toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '▲' : '▼'} debug: {screen}
      </button>
      {!collapsed && (
        <div className="shop-hud__body">
          <p className="shop-hud__screen">
            screen_type: <code>{screen}</code> — {SCREEN_TITLES[screen]}
          </p>
          <p className="shop-hud__section">Ожидаемые действия</p>
          <ul className="shop-hud__list">
            {expected.map(({ action, hint }) => (
              <li key={action} className={coverage[coverageKey(screen, action)] ? 'is-done' : ''}>
                <code>{action}</code>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
          <p className="shop-hud__section">Размечено в DOM ({domActions.length})</p>
          <ul className="shop-hud__list shop-hud__list--dom">
            {domActions.map((item, index) => (
              <li key={`${item.action}-${item.slot}-${index}`}>
                <code>
                  {item.screen}:{item.action}
                </code>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

export default DebugHud
