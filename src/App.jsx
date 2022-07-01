import { useState, createContext } from 'react'
import './App.css'
import Login from './pages/Login'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import CardOrder from './pages/CardOrder';
import NotFound from './pages/NotFound';

const OrderContext = createContext(null)

// ทดสอบ branch

function App() {

const [data, setData] = useState(null);

  return (
    <OrderContext.Provider value={{data, setData}}>
      <BrowserRouter>
          <Routes>
            <Route path="*" exact element={<NotFound />} />
            <Route path="/" exact element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/order" element={<CardOrder />} />
          </Routes>
        </BrowserRouter>
    </OrderContext.Provider>
  )
}

export { OrderContext }
export default App
