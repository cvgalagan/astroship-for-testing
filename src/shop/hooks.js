import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { resolveLabel } from './labels'
import { getProduct } from './catalog'
import { selectCart, selectLabelVariant } from '../store/shop/shopSlice'

// Текст кнопки для текущего варианта лейблов
export function useLabels() {
  const variant = useSelector(selectLabelVariant)
  return useCallback(
    (screen, action, slot) => resolveLabel({ variant, screen, action, slot }),
    [variant]
  )
}

// Позиции корзины, обогащённые данными каталога, плюс итоги
export function useCart() {
  const cart = useSelector(selectCart)
  const items = cart
    .map((line) => {
      const product = getProduct(line.id)
      if (!product) return null
      return { ...product, quantity: line.quantity, sum: product.price * line.quantity }
    })
    .filter(Boolean)

  const total = items.reduce((sum, item) => sum + item.sum, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return { items, total, count, isEmpty: items.length === 0 }
}

export const formatPrice = (value) => `${value.toLocaleString('ru-RU')} ₽`
