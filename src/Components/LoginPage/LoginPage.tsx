import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Spinner } from "Components/commons/spinner";
import { Login } from "Api/api";
import { selectorsUser, actionsAuthoriation } from "Store";
import { AppDispatch } from "Store/store";
import { useInput } from "./Custom/useInput";
import { useDispatch, useSelector } from "react-redux";
import css from "./login.module.css";

export const LoginPage: React.FC = () => {
  const login = useInput("", { isEmpty: true, isName: true });
  const pass = useInput("", { isEmpty: true, isPass: true });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userDataStatus = useSelector(selectorsUser.getLoadStatus);
  const userAuthStatus = useSelector(selectorsUser.getLoadIsAuth);

  const getUser = (user: Login) =>
    dispatch(actionsAuthoriation.getUserAuth(user));
  const getLogout = () => dispatch(actionsAuthoriation.userLogOut());

  const loginHandler = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    const data = {
      login: login.value,
      password: pass.value,
    };
    getUser(data);
  };
  const logOutHandler = (event: React.SyntheticEvent<EventTarget>) => {
    getLogout();
  };

  useEffect(() => {
    if (userAuthStatus) {
      setTimeout(() =>navigate("/"), 1000);
    }
  }, [userAuthStatus, navigate]);

  return (
    <div className={css.container}>
      {userDataStatus === "LOADING" && <Spinner />}
      {!userAuthStatus ? (
        <div>
          <input
            type="text"
            id="login"
            placeholder="Логин"
            onChange={login.onChange}
            onBlur={login.onBlure}
            value={login.value}
          />
          {login.isDirty && login.isEmpty && (
            <div className="form__allert">Поле не должно быть пустым</div>
          )}
          <input
            type="password"
            id="pass1"
            placeholder="Пароль"
            onChange={pass.onChange}
            onBlur={pass.onBlure}
            value={pass.value}
          />
          {pass.isDirty && pass.isEmpty && (
            <div className="form__allert">Пароль не может быть пустым</div>
          )}
          {pass.isDirty && pass.isPass && (
            <div className="form__allert">Короткий пароль</div>
          )}
          <Button
            type="primary"
            disabled={!login.inputValid || pass.isPass}
            onClick={loginHandler}
          >
            Войти
          </Button>
          <Link to="/registration">
            <Button>Регистрация</Button>
          </Link>
        </div>
      ) : (
        <div>Спасибо что посетили нас</div>
      )}
      {userAuthStatus && <button onClick={logOutHandler}>Выйти</button>}
    </div>
  );
};
