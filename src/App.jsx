import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/HomePage/HomePage'
import FormsPage from './components/FormsPage/FormsPage'
import WindowPage from './components/WindowPage/WindowPage'
import ActivityPage from './components/ActivityPage/ActivityPage'
import ShopLayout from './components/ShopPage/ShopLayout'
import GalleryPage from './components/ShopPage/GalleryPage'
import ProductPage from './components/ShopPage/ProductPage'
import CartPage from './components/ShopPage/CartPage'
import CheckoutPage from './components/ShopPage/CheckoutPage'
import PaymentPage from './components/ShopPage/PaymentPage'
import OrdersPage from './components/ShopPage/OrdersPage'
import OrderDetailsPage from './components/ShopPage/OrderDetailsPage'
import CoveragePage from './components/ShopPage/CoveragePage'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/window" element={<WindowPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/shop" element={<ShopLayout />}>
              <Route index element={<GalleryPage />} />
              <Route path="product/:productId" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:orderId" element={<OrderDetailsPage />} />
              <Route path="coverage" element={<CoveragePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
