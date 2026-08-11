// Тексты кнопок вынесены из разметки, чтобы одну и ту же воронку можно было
// показать с разными формулировками. Вариант переключается в шапке магазина.
//
// Вариант B специально делает лейблы неоднозначными: «Оформить заказ» стоит
// и на корзине (BEGIN_CHECKOUT), и на чекауте (PLACE_ORDER), «Оплатить» —
// и на оплате (PLACE_ORDER), и в заказе (PAY_CREATED_ORDER). Различить можно
// только по контексту экрана, а не по словарю кнопок.

import { ACTION } from './taxonomy'

export const LABEL_VARIANTS = [
  { id: 'a', title: 'Вариант A', hint: 'Однозначные формулировки' },
  { id: 'b', title: 'Вариант B', hint: 'Неоднозначные и англоязычные' }
]

export const DEFAULT_VARIANT = 'a'

const LABELS = {
  a: {
    [ACTION.ADD_TO_CART]: 'В корзину',
    [ACTION.BEGIN_CHECKOUT]: 'Перейти к оформлению',
    [ACTION.PLACE_ORDER]: 'Подтвердить заказ',
    [ACTION.PAY_CREATED_ORDER]: 'Оплатить заказ',
    [ACTION.QUICK_ORDER]: 'Купить в 1 клик',
    [ACTION.SUBMIT_LEAD]: 'Заказать звонок',
    [ACTION.VERIFY_CONTACT]: 'Подтвердить номер',
    [ACTION.JOIN_LOYALTY]: 'Вступить в клуб'
  },
  b: {
    [ACTION.ADD_TO_CART]: 'Купить',
    [ACTION.BEGIN_CHECKOUT]: 'Оформить заказ',
    [ACTION.PLACE_ORDER]: 'Оформить заказ',
    [ACTION.PAY_CREATED_ORDER]: 'Оплатить',
    [ACTION.QUICK_ORDER]: 'Быстрый заказ',
    [ACTION.SUBMIT_LEAD]: 'Отправить',
    [ACTION.VERIFY_CONTACT]: 'Отправить код',
    [ACTION.JOIN_LOYALTY]: 'Получить карту'
  }
}

// Точечные переопределения: где по сценарию нужен свой текст, не совпадающий
// с общим лейблом действия. Ключ — `${screen}:${action}:${slot}`.
const OVERRIDES = {
  a: {
    'product_gallery:SUBMIT_LEAD:notify': 'Сообщить о поступлении',
    'product_card:JOIN_LOYALTY:sidebar': 'Оформить бонусную карту',
    'cart:VERIFY_CONTACT:reserve': 'Получить код для брони',
    'cart:QUICK_ORDER:express': 'Быстрый заказ без регистрации',
    'cart:ADD_TO_CART:upsell': 'Добавить',
    'checkout:ADD_TO_CART:upsell': 'Добавить к заказу',
    'checkout:PLACE_ORDER:main': 'Отправить заявку',
    'checkout:VERIFY_CONTACT:request': 'Получить код',
    'checkout:VERIFY_CONTACT:submit': 'Подтвердить код',
    'checkout:QUICK_ORDER:express': 'Оформить экспресс-заказ',
    'checkout:JOIN_LOYALTY:inline': 'Оформить карту с заказом',
    'payment:PLACE_ORDER:main': 'Оплатить',
    'payment:VERIFY_CONTACT:receipt': 'Подтвердить контакт для чека',
    'payment:ADD_TO_CART:upsell': 'Добавить к заказу',
    'order_details:SUBMIT_LEAD:question': 'Задать вопрос по заказу',
    'order_details:ADD_TO_CART:repeat': 'Повторить заказ',
    'order_details:VERIFY_CONTACT:receive': 'Подтвердить получение кодом',
    'order_details:JOIN_LOYALTY:bonus': 'Начислить бонусы за заказ',
    'popup:QUICK_ORDER:submit': 'Оформить быстрый заказ',
    'popup:SUBMIT_LEAD:callback': 'Отправить заявку на звонок',
    'popup:VERIFY_CONTACT:submit': 'Подтвердить код',
    'popup:JOIN_LOYALTY:submit': 'Оформить карту',
    'popup:ADD_TO_CART:upsell': 'Добавить к заказу',
    'checkout:PLACE_ORDER:modal': 'Подтвердить заказ'
  },
  b: {
    'product_gallery:SUBMIT_LEAD:notify': 'Узнать о поступлении',
    'product_card:JOIN_LOYALTY:sidebar': 'Стать участником',
    'cart:VERIFY_CONTACT:reserve': 'Отправить код',
    'cart:QUICK_ORDER:express': 'Заказать в 1 клик',
    'cart:ADD_TO_CART:upsell': 'Взять',
    'checkout:ADD_TO_CART:upsell': 'Добавить',
    'checkout:PLACE_ORDER:main': 'Оформить заказ',
    'checkout:VERIFY_CONTACT:request': 'Выслать SMS',
    'checkout:VERIFY_CONTACT:submit': 'Проверить',
    'checkout:QUICK_ORDER:express': 'Express checkout',
    'checkout:JOIN_LOYALTY:inline': 'Хочу карту',
    'payment:PLACE_ORDER:main': 'Оплатить',
    'payment:VERIFY_CONTACT:receipt': 'Подтвердить e-mail',
    'payment:ADD_TO_CART:upsell': 'Добавить',
    'order_details:SUBMIT_LEAD:question': 'Написать в поддержку',
    'order_details:ADD_TO_CART:repeat': 'Заказать ещё раз',
    'order_details:VERIFY_CONTACT:receive': 'Ввести код курьера',
    'order_details:JOIN_LOYALTY:bonus': 'Забрать бонусы',
    'popup:QUICK_ORDER:submit': 'Заказать',
    'popup:SUBMIT_LEAD:callback': 'Жду звонка',
    'popup:VERIFY_CONTACT:submit': 'Готово',
    'popup:JOIN_LOYALTY:submit': 'Вступить',
    'popup:ADD_TO_CART:upsell': 'Добавить',
    'checkout:PLACE_ORDER:modal': 'Оформить заказ'
  }
}

export function resolveLabel({ variant = DEFAULT_VARIANT, screen, action, slot }) {
  const set = LABELS[variant] || LABELS[DEFAULT_VARIANT]
  const overrides = OVERRIDES[variant] || OVERRIDES[DEFAULT_VARIANT]
  if (slot) {
    const override = overrides[`${screen}:${action}:${slot}`]
    if (override) return override
  }
  return set[action] || action
}
