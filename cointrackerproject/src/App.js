import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Transactions from './pages/Transactions.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
