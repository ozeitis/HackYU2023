import './App.css';
import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useFormControl } from '@mui/material/FormControl';
import Chart from './Chart';
import Home from './Home';
import SearchBar from './SearchBar';
import TickerPage from './TickerPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/ticker/:value" element={<TickerPage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
