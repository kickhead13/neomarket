import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login'
import Home from './NeoMarket'
import Layout from "./components/Layout";
import Home2 from "./components/Home";
import Chat from "./components/Chat";
import Cart from "./components/Cart";
import Anunt from "./components/Anunt";
import Account from "./components/Account";
import Product from "./components/Product";
import Email from "./email"
import './App.css'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/email" element={<Email />} />
        <Route path="/layout" element={<Layout />} >
          <Route index element={<Home2 />} />  
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/account" element={<Account />} />
        <Route path="/anunt" element={<Anunt />} />
        <Route path="/product" element={<Product />}>
          <Route path=':productId' element={<Product />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App