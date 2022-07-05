import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectorsUser } from "Store";
import { CartActions } from "Store/cartSlice";
import { Api } from "Api/api";
import { Image } from "antd";

const api = new Api();

interface Good {
  items: [oneGood];
  total: number;
}

interface oneGood {
  categoryTypeId: string;
  description: string;
  id: string;
  img: string;
  label: string;
  price: string;
}
export const ProductPage = () => {
  const [good, setGood] = useState<Good | undefined>(undefined);
  const { idGood } = useParams() as { idGood: string };
  const userAuthStatus = useSelector(selectorsUser.getLoadIsAuth);

  const dispatch = useDispatch<any>();
  useEffect(() => {
    document.title = good?.items[0].label || "Страница не найдена";
  }, [good]);

  const addToCartGood = (data: any) => dispatch(CartActions.addToCart(data));
  const addGoodToCart = (event: React.SyntheticEvent<EventTarget>) => {
    const data = { good: good?.items[0] };
    addToCartGood(data);
  };
  useEffect(() => {
    api.getGoodByID(idGood).then((items: any) => setGood(items));
  }, [idGood]);

  return (
    <>
      <h1>{good?.items[0].label}</h1>
      <Image width={400} src={good?.items[0].img} />
      <div>{good?.items[0].description}</div>
      <div>Price:{good?.items[0].price}</div>
      {userAuthStatus && <button onClick={addGoodToCart}>В корзину</button>}
    </>
  );
};
