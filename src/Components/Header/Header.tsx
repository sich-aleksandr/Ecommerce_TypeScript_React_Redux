import React from "react";
import { useSelector } from "react-redux";
import { CartSelectors } from "Store/cartSlice";
import { Link } from 'react-router-dom';
import logo from "./logo.jpg";
import css from './header.module.css'

const menu = [
  { id: "/", name: "Главная" },
  { id: "/goods", name: "Все товары" },
  { id: "/registration", name: "Регистрация" },
];

export const Header = () => {

  const goodInCart = useSelector(CartSelectors.getCart);

  return (
    <div className={css.header}>
      <Link to="/"><img className={css.logo} src={logo} alt="Logo" /></Link>
      <input
      className={css.input}
      placeholder="Поиск товара"></input>
      <nav className={css.menu}>
        <ul className={css.menu_items}>
          {menu.map(({ id, name }) => {
            return (
              <li className={css.item} key={id}>
                <Link className={css.link} to={id}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={css.cartDiv}><Link className={css.link} to="/cart"><img alt="cart" className={css.imgcart} src="https://cdn0.iconfinder.com/data/icons/webshop-essentials/100/shopping-cart-512.png"/></Link>
      {(goodInCart.length > 0) && <span className={css.spanCart}>{goodInCart.length}</span>}
      </div>
      
    </div>
  )
}

