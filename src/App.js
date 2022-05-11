import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./Countries";
import Country from "./Country";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Countries />} />
        <Route exact path="/:name" element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
