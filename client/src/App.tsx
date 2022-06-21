import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import 'rsuite/dist/rsuite.min.css'
import Login from './components/Login';
import Register from './components/Register';
import UserNavbar from './components/UserNavbar';
import { CartItems, Item, TargetLocation, User } from './types';
import ShopPage from './components/ShopPage';
import ItemShowPage from './components/ItemShowPage';
import CartPage from './components/CartPage';
import AdminApp from './components/admin/AdminApp';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://localhost:8000';
function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    axios.get('/check').then(res => {
      setUser(res.data);
    })
  }, [])


  const onLogout = async () => {
    await axios.post('/logout');
    setUser(undefined);
  }

  if (!user) {
    return (
      <BrowserRouter>
        <div className='app-container'>
          <Routes>
            <Route path='*' element={<Login onSubmit={async val => {
              const res = await axios.post('/login', val);
              setUser(res.data);
            }} />} />
            <Route path='/register' element={<Register onSubmit={async val => {
              const res = await axios.post('/register', val);
              setUser(res.data);
            }} />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
  if (!user.admin) {
    return (
      <UserApp user={user} onLogout={onLogout} />
    )
  }
  return (
    <AdminApp user={user} onLogout={onLogout} />
  );
}
interface UserProps {
  user: User,
  onLogout: () => void
}
function UserApp(props: UserProps) {
  const [cartItems, setCartItems] = useState<CartItems>({})


  const changeItem = (item: Item, val: number, merge = true) => {
    setCartItems(prev => {
      return {
        ...prev,
        [item.id!]: {
          count: (merge && prev[item.id!]?.count || 0) + val,
          item
        }
      }
    })
  }

  const orderUp = async (tl: Partial<TargetLocation>) => {
    await axios.post('/order', {
      targetLocation: tl,
      orderItems: Object.keys(cartItems).map((key: string) => {
        return {
          itemId: Number(key),
          count: cartItems[key as any].count
        }
      })
    });
    setCartItems({});
  }

  return (
    <BrowserRouter>
      <UserNavbar onLogout={props.onLogout} user={props.user} />
      <Routes>
        <Route path='*' element={(
          <div className='app-container'>
            <Home />
          </div>
        )} />
        <Route path='/shop' element={(<ShopPage />)} />
        <Route path='/cart' element={(
          <div className='app-container'>
            <CartPage
              onSubmit={orderUp}
              cartItems={cartItems}
              onItemChange={(item, val) => {
                changeItem(item, val, false);
              }}
            />
          </div>
        )} />
        <Route path='/item/:id' element={(
          <div className='app-container' >
            <ItemShowPage addToCart={id => {
              changeItem(id, 1);
            }} />
          </div>
        )} />
      </Routes>
    </BrowserRouter >
  )
}

export default App;
