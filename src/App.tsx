import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Paid } from './pages/Paid';
import { Transaction } from './pages/Transaction';


export function App() {

  return (
  
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paid" element={<Paid/>} />
        <Route path="/transaction" element={<Transaction/>} />
      </Routes>
    </div>
  </Router>
  
  )
}