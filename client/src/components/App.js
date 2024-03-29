import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import NoMatch from "./NoMatch";
import Header from "./Header";




function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;