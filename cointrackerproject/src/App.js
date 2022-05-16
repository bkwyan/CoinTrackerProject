import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import Transactions from './pages/Transactions.js';

const App = () => {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
      </Routes>
    </Router>
  );
}

export default App;
