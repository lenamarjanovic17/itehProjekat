import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { User } from '../../types'
import AdminNavbar from './AdminNavbar'
import ItemGroupPage from './ItemGroupPage'
import ItemsPage from './ItemsPage'
import OrderMonitoring from './OrderMonitoring'


interface Props {
  user: User,
  onLogout: () => void
}

export default function AdminApp(props: Props) {
  return (
    <BrowserRouter>
      <AdminNavbar onLogout={props.onLogout} user={props.user} />
      <Routes>
        <Route path='/item-group' element={<ItemGroupPage />} />
        <Route path='/' element={<OrderMonitoring />} />
        <Route path='/item' element={<ItemsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
