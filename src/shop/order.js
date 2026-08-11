// Заказы живут только в браузере: бэкенда у стенда нет, но воронка должна
// быть проходимой целиком — от корзины до оплаты созданного заказа.

export const ORDER_STATUS = {
  AWAITING_PAYMENT: 'awaiting_payment',
  PAID: 'paid',
  RECEIVED: 'received'
}

export const ORDER_STATUS_TITLES = {
  [ORDER_STATUS.AWAITING_PAYMENT]: 'Ожидает оплаты',
  [ORDER_STATUS.PAID]: 'Оплачен',
  [ORDER_STATUS.RECEIVED]: 'Получен'
}

export const ORDER_SOURCE_TITLES = {
  checkout: 'Стандартное оформление',
  quick: 'Быстрый заказ в 1 клик'
}

export function buildOrder({ items, total, customer, source = 'checkout', status = ORDER_STATUS.AWAITING_PAYMENT }) {
  const stamp = Date.now()
  return {
    id: `order-${stamp}`,
    number: `A-${String(stamp).slice(-6)}`,
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      quantity: item.quantity || 1
    })),
    total,
    customer,
    source,
    status
  }
}
