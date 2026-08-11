import { configureStore } from '@reduxjs/toolkit'
import timersReducer from './timers/timersSlice'
import shopReducer, { saveShopState } from './shop/shopSlice'

export const store = configureStore({
  reducer: {
    timers: timersReducer,
    shop: shopReducer
  }
})

// Корзина, заказы и прогресс покрытия переживают перезагрузку страницы
store.subscribe(() => {
  saveShopState(store.getState().shop)
})

export default store
