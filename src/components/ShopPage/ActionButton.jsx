import { useDispatch } from 'react-redux'
import { markCoverage } from '../../store/shop/shopSlice'
import { useLabels } from '../../shop/hooks'
import { trackAction } from '../../shop/analytics'

// Единственная точка, где на кнопку вешаются data-screen-type / data-action-type,
// отмечается покрытие и отправляется событие. Текст берётся из активного
// варианта лейблов, если не передан явно.
function ActionButton({
  screen,
  action,
  slot,
  label,
  product,
  value,
  kind = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  onClick
}) {
  const dispatch = useDispatch()
  const t = useLabels()
  const text = label ?? t(screen, action, slot)

  const handleClick = (event) => {
    dispatch(markCoverage({ screen, action }))
    trackAction({ screen, action, slot, label: text, product, value })
    onClick?.(event)
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`shop-btn shop-btn--${kind} ${className}`.trim()}
      data-screen-type={screen}
      data-action-type={action}
      data-slot={slot}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default ActionButton
