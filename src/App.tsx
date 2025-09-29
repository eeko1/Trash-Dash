import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './views/Home'
import Trashorsmash from './views/Trashorsmash';

function App() {
  return (
  <Router>
     <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/Trashorsmash" element={<Trashorsmash />} />
     </Routes>
  </Router>
  );
}

export default App;