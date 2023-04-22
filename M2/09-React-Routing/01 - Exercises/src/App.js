import React from "react";
import { Route, Routes } from "react-router-dom";
/* eslint-disable */
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Shipping from "./components/Shipping/Shipping.jsx";
import Discounts from "./components/Discounts/Discounts.jsx";
import CardDetail from "./components/CardDetail/CardDetail.jsx";
/* eslint-disable */

export default function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/shipping" element={<Shipping />}></Route>
                <Route path="/discounts" element={<Discounts />}></Route>
                <Route path="/cruises/:id" element={<CardDetail />}></Route>
            </Routes >
        </>
    );
}
