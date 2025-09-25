import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Auth from './pages/Auth/Auth'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Order'
import Payment from './pages/Payment/Payment'
import Results from './pages/Results/Results'
import ProductDetail from './pages/ProductDetail/ProductDetail'



const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:productId" element={<ProductDetail/>} />
      </Routes>
    </Router>
  )
}

export default AppRouter;