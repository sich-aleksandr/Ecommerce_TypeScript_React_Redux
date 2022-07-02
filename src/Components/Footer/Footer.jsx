import React from 'react';
import css from "./footer.module.css";

export const Footer = () => {
   const date = new Date();
    return (
        <div className={css.footer}>
            © Оформление сайта. Sich.aleksandr {date.getFullYear()}
        </div>
    )
}