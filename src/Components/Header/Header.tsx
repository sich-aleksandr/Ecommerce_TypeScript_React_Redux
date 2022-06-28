import React from "react";
import { Link } from 'react-router-dom';
import logo from "./logo.jpg";
import css from './header.module.css'

const menu = [
  { id: "/", name: "Главная" },
  { id: "/registration", name: "Регистрация" },
  { id: "/cart", name: "Корзина" },
];

export const Header = () => {

  return (
    <div className={css.header}>
      <Link to="/"><img className={css.logo} src={logo} alt="Logo" /></Link>
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
    </div>
  )
}

