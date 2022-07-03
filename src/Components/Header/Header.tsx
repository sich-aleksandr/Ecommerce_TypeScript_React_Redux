import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartSelectors } from "Store/cartSlice";
import { selectorsUser, actionsAuthoriation } from "Store";
import { AppDispatch } from "Store/store";
import { Link } from "react-router-dom";
import { Input } from "./Input";
import logo from "./logo.jpg";
import css from "./header.module.css";
import { Button } from "antd";

export const Header = () => {

  const dispatch = useDispatch<AppDispatch>();

  const goodInCart = useSelector(CartSelectors.getCart);
  const userAuthStatus = useSelector(selectorsUser.getLoadIsAuth);
  const getLogout = () => dispatch(actionsAuthoriation.userLogOut());

  const logOutHandler = (event: React.SyntheticEvent<EventTarget>) => {
    getLogout();
  };

  return (
    <div className={css.header}>
      <Link to="/">
        <img className={css.logo} src={logo} alt="Logo" />
      </Link>
      <Input />
      <nav className={css.menu}>
        <ul className={css.menu_items}>
          <li className={css.item}>
            <Link className={css.link} to="/">
              Главная
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to="/goods">
              Все товары
            </Link>
          </li>
        </ul>
      </nav>
      { !userAuthStatus ? <div className={css.item}>
        <Link className={css.link} to="/login">
          Войти
        </Link>
      </div> : <div className={css.item}> 
      Спасибо что вы снами
      <Button
      type="primary"
      onClick={logOutHandler}>
        Выйти
      </Button>
      </div>}
      {userAuthStatus && (
        <div className={css.cartDiv}>
          <Link className={css.link} to="/cart">
            <img
              alt="cart"
              className={css.imgcart}
              src="https://cdn0.iconfinder.com/data/icons/webshop-essentials/100/shopping-cart-512.png"
            />
          </Link>
          {goodInCart.length > 0 && (
            <span className={css.spanCart}>{goodInCart.length}</span>
          )}
        </div>
      )}
    </div>
  );
};
