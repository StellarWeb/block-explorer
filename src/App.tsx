import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Transaction from "./pages/Transaction";
import Block from "./pages/Block";
import Address from "./pages/Address";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="address/:address" element={<Address />} />
        <Route path="block/:blockNumber" element={<Block />} />
        <Route path="tx/:txId" element={<Transaction />} />
      </Routes>
    </Router>
  );
};

export default App;
