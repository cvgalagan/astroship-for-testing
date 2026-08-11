// Таксономия стенда: screen_type и action_type из спецификации разметки.
// Из screen_type исключён "other", из action_type — динамические (свободные) значения.

export const SCREEN = {
  CART: 'cart',
  CHECKOUT: 'checkout',
  PAYMENT: 'payment',
  PRODUCT_CARD: 'product_card',
  PRODUCT_GALLERY: 'product_gallery',
  ORDER_DETAILS: 'order_details',
  POPUP: 'popup'
}

export const ACTION = {
  PLACE_ORDER: 'PLACE_ORDER',
  PAY_CREATED_ORDER: 'PAY_CREATED_ORDER',
  ADD_TO_CART: 'ADD_TO_CART',
  BEGIN_CHECKOUT: 'BEGIN_CHECKOUT',
  QUICK_ORDER: 'QUICK_ORDER',
  SUBMIT_LEAD: 'SUBMIT_LEAD',
  VERIFY_CONTACT: 'VERIFY_CONTACT',
  JOIN_LOYALTY: 'JOIN_LOYALTY'
}

export const SCREEN_TITLES = {
  [SCREEN.PRODUCT_GALLERY]: 'Каталог (PLP)',
  [SCREEN.PRODUCT_CARD]: 'Карточка товара (PDP)',
  [SCREEN.CART]: 'Корзина',
  [SCREEN.CHECKOUT]: 'Оформление',
  [SCREEN.PAYMENT]: 'Оплата',
  [SCREEN.ORDER_DETAILS]: 'Заказ',
  [SCREEN.POPUP]: 'Модальное окно'
}

// Обязательные к покрытию пары screen_type × action_type.
// Ключ пары — `${screen}:${action}`, он же ключ в стейте покрытия.
export const COVERAGE_MATRIX = [
  {
    screen: SCREEN.PRODUCT_GALLERY,
    where: '/shop',
    actions: [
      { action: ACTION.ADD_TO_CART, hint: 'Кнопка на карточке товара в сетке' },
      { action: ACTION.QUICK_ORDER, hint: 'Покупка в 1 клик прямо из сетки' },
      { action: ACTION.SUBMIT_LEAD, hint: 'Сообщить о поступлении товара не в наличии' },
      { action: ACTION.JOIN_LOYALTY, hint: 'Баннер программы лояльности над сеткой' }
    ]
  },
  {
    screen: SCREEN.PRODUCT_CARD,
    where: '/shop/product/:id',
    actions: [
      { action: ACTION.ADD_TO_CART, hint: 'Основная кнопка покупки' },
      { action: ACTION.QUICK_ORDER, hint: 'Кнопка быстрого заказа рядом с ценой' },
      { action: ACTION.SUBMIT_LEAD, hint: 'Заказать обратный звонок по товару' },
      { action: ACTION.JOIN_LOYALTY, hint: 'Блок бонусной карты в правой колонке' }
    ]
  },
  {
    screen: SCREEN.CART,
    where: '/shop/cart',
    actions: [
      { action: ACTION.BEGIN_CHECKOUT, hint: 'Переход из корзины в воронку оформления' },
      { action: ACTION.ADD_TO_CART, hint: 'Блок «С этим товаром покупают»' },
      { action: ACTION.QUICK_ORDER, hint: 'Быстрый заказ мимо стандартного оформления' },
      { action: ACTION.VERIFY_CONTACT, hint: 'Подтверждение телефона для брони корзины' },
      { action: ACTION.JOIN_LOYALTY, hint: 'Предложение бонусной карты в сайдбаре' }
    ]
  },
  {
    screen: SCREEN.CHECKOUT,
    where: '/shop/checkout',
    actions: [
      { action: ACTION.PLACE_ORDER, hint: 'Финальная кнопка оформления (лейбл-ловушка)' },
      { action: ACTION.VERIFY_CONTACT, hint: 'Запрос и ввод кода из СМС' },
      { action: ACTION.ADD_TO_CART, hint: 'Виджет допов внутри формы' },
      { action: ACTION.QUICK_ORDER, hint: 'Экспресс-оформление вместо полной формы' },
      { action: ACTION.JOIN_LOYALTY, hint: 'Оформление карты вместе с заказом' }
    ]
  },
  {
    screen: SCREEN.PAYMENT,
    where: '/shop/payment',
    actions: [
      { action: ACTION.PLACE_ORDER, hint: 'Кнопка оплаты, завершающая воронку' },
      { action: ACTION.VERIFY_CONTACT, hint: 'Подтверждение контакта для отправки чека' },
      { action: ACTION.ADD_TO_CART, hint: 'Допродажа на шаге оплаты' }
    ]
  },
  {
    screen: SCREEN.ORDER_DETAILS,
    where: '/shop/orders/:id',
    actions: [
      { action: ACTION.PAY_CREATED_ORDER, hint: 'Оплата ранее созданного заказа' },
      { action: ACTION.SUBMIT_LEAD, hint: 'Вопрос по заказу без покупки' },
      { action: ACTION.ADD_TO_CART, hint: 'Повторить заказ — товары в корзину' },
      { action: ACTION.VERIFY_CONTACT, hint: 'Код для подтверждения получения' },
      { action: ACTION.JOIN_LOYALTY, hint: 'Начислить бонусы за заказ' }
    ]
  },
  {
    screen: SCREEN.POPUP,
    where: 'модальные окна',
    actions: [
      { action: ACTION.QUICK_ORDER, hint: 'Отправка формы быстрого заказа' },
      { action: ACTION.SUBMIT_LEAD, hint: 'Форма обратного звонка' },
      { action: ACTION.VERIFY_CONTACT, hint: 'Ввод кода подтверждения' },
      { action: ACTION.JOIN_LOYALTY, hint: 'Оформление бонусной карты' },
      { action: ACTION.ADD_TO_CART, hint: 'Допродажа внутри модалки' }
    ]
  }
]

export const coverageKey = (screen, action) => `${screen}:${action}`

export const ALL_COVERAGE_KEYS = COVERAGE_MATRIX.flatMap(({ screen, actions }) =>
  actions.map(({ action }) => coverageKey(screen, action))
)

export const TOTAL_COVERAGE = ALL_COVERAGE_KEYS.length
