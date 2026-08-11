import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// Модалка рендерится порталом в body — так же, как в большинстве реальных
// магазинов: оверлей лежит поверх контента, а не внутри дерева страницы.
function Modal({ open, title, subtitle, onClose, screen, children }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="shop-modal-overlay" onClick={onClose}>
      <div
        className="shop-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-screen-type={screen}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="shop-modal__head">
          <div>
            <h3 className="shop-modal__title">{title}</h3>
            {subtitle && <p className="shop-modal__subtitle">{subtitle}</p>}
          </div>
          <button type="button" className="shop-modal__close" aria-label="Закрыть" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="shop-modal__body">{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
