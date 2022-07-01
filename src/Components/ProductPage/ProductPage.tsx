import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useParams} from 'react-router-dom'
import { actions as CartActions } from "Store/cartSlice";
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
  const {idGood}=useParams() as {idGood:string};

  const dispatch = useDispatch();

  let id:number;
  let name:string;
  let img:string;
  let price: string;

  if (typeof good?.items[0].id === "undefined")
{
  id=NaN;
}
else
{
  id = +good?.items[0].id;
  name = good?.items[0].label
  img = good?.items[0].img
  price = good?.items[0].price
}

  const addGoodToCart = () => dispatch(CartActions.addToCart({ id, name, img, price }));

  useEffect(() => {
    api.getGoodByID(idGood).then((items: any) => setGood(items));
  }, [idGood]);

  console.log(good?.items[0].img);

  return (
    <>
      <h1>{good?.items[0].label}</h1>
      <Image width={400} src={good?.items[0].img} />
      <div>{good?.items[0].description}</div>
      <div>Price:{good?.items[0].price}</div>
      <button onClick={addGoodToCart}>В корзину</button>
    </>
  );
};
