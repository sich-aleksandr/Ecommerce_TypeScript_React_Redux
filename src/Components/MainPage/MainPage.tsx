import { useEffect } from 'react'
import { Routes, Route } from "react-router";
import { Header } from "Components/Header";
import { GoodsCart } from "Components/Cart";
import { RegistrationForm } from "Components/RegistrationForm";
import { LoginPage } from "Components/LoginPage"
import { MenuCategories } from "Components/Menu";
import { GoodsPage } from "Components/GoodsPage";
import { CategoryPage } from 'Components/CategoryPage'
import { SelectedCategoryPage } from 'Components/SelectedCategoryPage'
import { ProductPage } from "Components/ProductPage";
import { Footer } from "Components/Footer";

export const MainPage = () => {

  useEffect(() => {
    document.title = "Main page";
  }, []);

  return (
    <>
      <Header />
      <MenuCategories />
      <Routes>
        <Route path="/" element={<CategoryPage/>} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/goods/:idGood" element={<ProductPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/cart" element={<GoodsCart />} />
        <Route path="/test" element={<ProductPage />} />
        <Route path="/category/:idCategory" element={<SelectedCategoryPage/>} />
        <Route path="/category/:idCategory/:idGood" element={<ProductPage/>} />
        <Route path="/:idGood" element={<ProductPage/>} />
      </Routes>
      <Footer />
    </>
  );
};
