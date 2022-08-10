import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"

import Home from "./pages/Home"
import Cart from './pages/Cart'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import ScrollToTop from './components/Etc/scrollToTop'
import OrderList from './pages/OrderList'

export default function App() {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={!user ? <Login /> : <Navigate to="/" /> } />
            <Route path="register" element={<Register />} />
            <Route path="shop" element={<ProductList />} />
            <Route path="shop/:category" element={<ProductList />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<OrderList />} />
        </Routes>
    </BrowserRouter>
  )
}