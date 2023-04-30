import './App.css';
import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useFormControl } from '@mui/material/FormControl';
import Chart from './Chart';
import Home from './Home';
import SearchBar from './SearchBar';



function App() {
  return (
    
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/">
    //       <Route index element={<Home />} />
    //       {/* <Route path="blogs" element={<Blogs />} />
    //       <Route path="contact" element={<Contact />} />
    //       <Route path="*" element={<NoPage />} /> */}
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <Home title='hi'></Home>
    
  )
}


export default App;
