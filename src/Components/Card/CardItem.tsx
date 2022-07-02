import React from 'react'
import { Card } from 'antd';


interface productCard {
  id: string,
  label:string,
  img:string,
  price:number
}
export const CardItem:React.FC<productCard>=({id,img,price,label})=>{
  
  return(
    <Card 
    title={label} bordered={false}
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={img} />}
  >
    {<span>Цена: {price} </span>}
  </Card>

  )
}