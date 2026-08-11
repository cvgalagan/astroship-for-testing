// Отправка событий магазина в Метрику и dataLayer.
// Счётчик инициализируется в index.html, здесь только вызовы reachGoal и
// ecommerce-пуши — стенд заодно проверяет, доходят ли они через Partytown.

export const METRIKA_COUNTER_ID = 101671390

const pushDataLayer = (payload) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

const reachGoal = (goal, params) => {
  if (typeof window.ym === 'function') {
    window.ym(METRIKA_COUNTER_ID, 'reachGoal', goal, params)
  }
}

export const isDebugEnabled = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug')

// Клик по целевой кнопке: screen_type + action_type в терминах спецификации
export function trackAction({ screen, action, label, slot, product, value }) {
  const payload = {
    event: 'shop_action',
    screen_type: screen,
    action_type: action,
    button_label: label,
    slot: slot || null,
    product_id: product?.id || null,
    value: value ?? product?.price ?? null
  }

  pushDataLayer(payload)
  reachGoal(`${screen}__${action}`.toLowerCase(), payload)

  if (isDebugEnabled()) {
    console.info('[shop]', screen, action, label, payload)
  }
}

// Стандартный ecommerce-контейнер Метрики
export function trackEcommerce(type, products, extra = {}) {
  const goods = (Array.isArray(products) ? products : [products]).map((item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    category: item.category,
    quantity: item.quantity || 1
  }))

  pushDataLayer({
    ecommerce: {
      currencyCode: 'RUB',
      [type]: { products: goods, ...extra }
    }
  })

  if (isDebugEnabled()) {
    console.info('[shop:ecommerce]', type, goods, extra)
  }
}
