import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_VARIANT } from '../../shop/labels'
import { coverageKey } from '../../shop/taxonomy'

const STORAGE_KEY = 'shop-state-v1'

// Фабрика, а не константа: immer замораживает состояние, и общий объект
// после сброса стенда стал бы нередактируемым
const createEmptyState = () => ({
  cart: [],
  orders: [],
  lastOrderId: null,
  loyalty: { joined: false },
  contact: { phone: '', verified: false, codeSent: false },
  labelVariant: DEFAULT_VARIANT,
  coverage: {}
})

// Состояние переживает перезагрузку: иначе воронка рвётся на каждом шаге,
// а прогресс покрытия обнуляется.
export const loadShopState = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createEmptyState()
    return { ...createEmptyState(), ...JSON.parse(raw) }
  } catch {
    return createEmptyState()
  }
}

export const saveShopState = (state) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // приватный режим — просто работаем без персиста
  }
}

const initialState = typeof window === 'undefined' ? createEmptyState() : loadShopState()

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload
      const line = state.cart.find((item) => item.id === id)
      if (line) {
        line.quantity += quantity
      } else {
        state.cart.push({ id, quantity })
      }
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const line = state.cart.find((item) => item.id === id)
      if (!line) return
      line.quantity = Math.max(quantity, 1)
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.cart = []
    },
    createOrder: (state, action) => {
      const { id, number, items, total, customer, status, source } = action.payload
      state.orders.unshift({
        id,
        number,
        items,
        total,
        customer,
        status,
        source,
        createdAt: new Date().toISOString()
      })
      state.lastOrderId = id
    },
    markOrderPaid: (state, action) => {
      const order = state.orders.find((item) => item.id === action.payload)
      if (order) order.status = 'paid'
    },
    markOrderReceived: (state, action) => {
      const order = state.orders.find((item) => item.id === action.payload)
      if (order) order.status = 'received'
    },
    joinLoyalty: (state) => {
      state.loyalty.joined = true
    },
    setPhone: (state, action) => {
      state.contact.phone = action.payload
    },
    requestCode: (state) => {
      state.contact.codeSent = true
    },
    verifyContact: (state) => {
      state.contact.verified = true
      state.contact.codeSent = false
    },
    setLabelVariant: (state, action) => {
      state.labelVariant = action.payload
    },
    markCoverage: (state, action) => {
      const { screen, action: actionType } = action.payload
      state.coverage[coverageKey(screen, actionType)] = true
    },
    resetCoverage: (state) => {
      state.coverage = {}
    },
    resetShop: (state) => {
      const variant = state.labelVariant
      Object.assign(state, createEmptyState(), { labelVariant: variant })
    }
  }
})

export const {
  addToCart,
  setQuantity,
  removeFromCart,
  clearCart,
  createOrder,
  markOrderPaid,
  markOrderReceived,
  joinLoyalty,
  setPhone,
  requestCode,
  verifyContact,
  setLabelVariant,
  markCoverage,
  resetCoverage,
  resetShop
} = shopSlice.actions

// Селекторы
export const selectCart = (state) => state.shop.cart
export const selectCartCount = (state) =>
  state.shop.cart.reduce((sum, item) => sum + item.quantity, 0)
export const selectOrders = (state) => state.shop.orders
export const selectOrderById = (id) => (state) =>
  state.shop.orders.find((order) => order.id === id)
export const selectLastOrder = (state) =>
  state.shop.orders.find((order) => order.id === state.shop.lastOrderId) || null
export const selectLoyalty = (state) => state.shop.loyalty
export const selectContact = (state) => state.shop.contact
export const selectLabelVariant = (state) => state.shop.labelVariant
export const selectCoverage = (state) => state.shop.coverage

export default shopSlice.reducer
