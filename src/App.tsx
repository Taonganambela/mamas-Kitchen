import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Paid } from './pages/Paid';
import { Transaction } from './pages/Transaction';
import { Success } from './pages/Success';


export function App() {

  return (
  
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paid" element={<Paid/>} />
        <Route path="/transaction" element={<Transaction/>} />
        <Route path="/success" element={<Success/>} />
      </Routes>
    </div>
  </Router>
  
  )
}