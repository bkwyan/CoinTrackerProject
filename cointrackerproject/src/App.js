import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import Transactions from './pages/Transactions.js';
import { GlobalStyle } from './styles/GlobalStyle';

const App = () => {

  return (
    <Router>
      <GlobalStyle/>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
      </Routes>
    </Router>
  );
}

export default App;
