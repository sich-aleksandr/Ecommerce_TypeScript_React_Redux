import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
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

  useEffect(() => {
    api.getGoodByID(idGood).then((items: any) => setGood(items));
  }, []);

  console.log(good?.items[0].img);

  return (
    <>
      <h1>{good?.items[0].label}</h1>
      <Image width={400} src={good?.items[0].img} />
      <div>{good?.items[0].description}</div>
      <div>Price:{good?.items[0].price}</div>
    </>
  );
};
