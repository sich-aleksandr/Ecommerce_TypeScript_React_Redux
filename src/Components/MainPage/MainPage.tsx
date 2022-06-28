import React from "react";
import { Routes, Route } from "react-router";
import { Header } from 'Components/Header';
import { RegistrationForm } from 'Components/RegistrationForm';
import { MenuCategories } from "Components/Menu";
import { Footer } from 'Components/Footer';

export const MainPage = () => {
    return (
        <>
        <Header />
        <MenuCategories />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/registration" element={<RegistrationForm />} /> 
        </Routes>
        <Footer />
        </>
    )
}