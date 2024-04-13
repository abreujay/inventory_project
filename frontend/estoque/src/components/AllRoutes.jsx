import { Routes, Route } from 'react-router-dom'
import ProductsComponent from './ProductsComponent'
import EditProducts from './EditProducts'

import React from 'react'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ProductsComponent />} />
        <Route path='/view-products' element={<EditProducts/>} />
  </Routes>
  )
}

export default AllRoutes