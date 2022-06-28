import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'antd';


interface Card {
  id: string,
  label:string,
  img:string,
  price:number
}
export const CardItem:React.FC<Card>=({id,img,price,label})=>{
  const { Meta } = Card;
  return(
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={img} />}
  >
    <Meta title={price} description={<Link to={id}>{label}</Link>} />
  </Card>

  )
}