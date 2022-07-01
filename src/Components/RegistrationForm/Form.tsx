import React, { useState, useEffect } from "react";
import { useInput } from "./Custom/useInput";
import { LOAD_STATUSES } from "./constants";
import { Spinner } from "Components/commons/spinner";
import css from './form.module.css'
import "./Form.scss";

export const RegistrationForm = () => {
  const name = useInput("", { isEmpty: true, isName: true });
  const sname = useInput("", { isEmpty: true, isName: true });
  const pass1 = useInput("", { isEmpty: true, isPass: true });
  const pass2 = useInput("", { isEmpty: true, isPass: true });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const sex = useInput("", { isEmpty: true, isEmail: true });
  const dateBith = useInput("", { isEmpty: true, isDate: true });

  const [formSended, setFormSended] = useState(LOAD_STATUSES.UNKNOWN);

  useEffect(() => {
    document.title = "Регистрация";
  }, []);

  useEffect(() => {
    if (formSended === LOAD_STATUSES.LOADED) {
      name.onClean();
      email.onClean();
      dateBith.onClean();
      setTimeout(() => setFormSended(LOAD_STATUSES.UNKNOWN), 3000);
    }
  }, [formSended]);

  const postDataHandler = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setFormSended(LOAD_STATUSES.LOADED);
  };

  const cancelDataHandler = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setFormSended(LOAD_STATUSES.LOADED);
  };

  return (
    <>
      <form className="form">
        <span className="form__title">Регистрация</span>
        <span className="form__subhead">Пожалуйста заполните все поля</span>
        <div className="input-container">
          <input
            type="text"
            id="login"
            onChange={name.onChange}
            onBlur={name.onBlure}
            value={name.value.toUpperCase()}
          />
          <label
            className={
              !name.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="login"
          >
            Имя
          </label>

          {name.isDirty && name.isEmpty && (
            <div className="form__allert">Имя не должно быть пустым</div>
          )}
          {name.isDirty && name.nameError && (
            <div className="form__allert">Ошибка при написании имени</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            id="slogin"
            onChange={sname.onChange}
            onBlur={sname.onBlure}
            value={sname.value.toUpperCase()}
          />
          <label
            className={
              !sname.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="slogin"
          >
            Фамилия
          </label>

          {sname.isDirty && sname.nameError && (
            <div className="form__allert">Ошибка при написании имени</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="email"
            id="email"
            onChange={email.onChange}
            onBlur={email.onBlure}
            value={email.value}
          />
          <label
            className={
              !email.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="email"
          >
            Email
          </label>
          {email.isDirty && email.isEmpty && (
            <div className="form__allert">Емайл не может быть пустым</div>
          )}
          {email.isDirty && email.emailError && (
            <div className="form__allert">Не правильный Email</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            id="pass1"
            onChange={pass1.onChange}
            onBlur={pass1.onBlure}
            value={pass1.value}
          />
          <label
            className={
              !pass1.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="pass1"
          >
            Пароль
          </label>
          {pass1.isDirty && pass1.isEmpty && (
            <div className="form__allert">Пароль не может быть пустым</div>
          )}
          {pass1.isDirty && pass1.isPass && (
            <div className="form__allert">Короткий пароль</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            id="pass2"
            onChange={pass2.onChange}
            onBlur={pass2.onBlure}
            value={pass2.value}
          />
          <label
            className={
              !pass2.isDirty ? "input-label" : "input-label input-label-pass"
            }
            htmlFor="pass1"
          >
            Повторите Пароль
          </label>
          {pass2.isDirty && pass2.isEmpty && (
            <div className="form__allert">Пароль не может быть пустым</div>
          )}
          {pass2.isDirty && pass2.isPass && (
            <div className="form__allert">Короткий пароль</div>
          )}
          {!(pass2.value === pass1.value) && (
            <div className="form__allert">Пароли не совпадают</div>
          )}
        </div>
        <div className="input-container-flex">
          <input
            type="radio"
            name="sex"
            id="sexChoice1"
            onChange={sex.onChange}
            value={sex.value}
          />
          <label
            htmlFor="sexChoice1"
          >
            Мужской
          </label>
          <input
            type="radio"
            name="sex"
            id="sexChoice2"
            onChange={sex.onChange}
            value={sex.value}
          />
          <label
            htmlFor="sexChoice2"
          >
            Женский
          </label>
        </div>
        <div className="input-container-flex">
        <label className={css.switch}>
        <input type="checkbox"/>
        <span className={css.slider}></span>
        
      </label>
            <span>Подписаться на новости</span>
        </div>

        <div className="input-container">
          <input
            type="date"
            name="calendar"
            onBlur={dateBith.onBlure}
            onChange={dateBith.onChange}
            value={dateBith.value}
          />
          <label
            className={
              !dateBith.isDirty
                ? "input-label input-label-date"
                : "input-label input-label-pass"
            }
            htmlFor="bday"
          >
            Дата рождения
          </label>
        </div>
        {dateBith.isDirty && dateBith.isEmpty && (
          <div className="form__allert">
            Поле c датой рождения не может быть пустым
          </div>
        )}
        {dateBith.isDirty && dateBith.dateError && (
          <div className="form__allert">Не верная дата рождения</div>
        )}

        <div className="button-container">
          <button
            className="btn"
            disabled={
              !email.inputValid ||
              !name.inputValid ||
              !(pass2.value === pass1.value) ||
              !dateBith.inputValid ||
              formSended === LOAD_STATUSES.LOADING
            }
            onClick={(e) => postDataHandler(e)}
          >
            Зарегистрироваться
          </button>
          <button className="btn" onClick={cancelDataHandler}>
            Отмена
          </button>
          {formSended === LOAD_STATUSES.LOADING && <Spinner />}
        </div>

        {formSended === LOAD_STATUSES.ERROR && (
          <div className="form__massage form__massage-error">
            {LOAD_STATUSES.ERROR}
          </div>
        )}
        {formSended === LOAD_STATUSES.LOADED && (
          <div className="form__massage">{LOAD_STATUSES.LOADED}</div>
        )}
      </form>
    </>
  );
};
