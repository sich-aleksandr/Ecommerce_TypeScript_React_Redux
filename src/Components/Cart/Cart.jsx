import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartActions, CartSelectors } from "Store/cartSlice";
import { Table, Image } from "antd";

export const GoodsCart = () => {
  const dispatch = useDispatch();
  const goodInCart = useSelector(CartSelectors.getGoodsInCart);
  const [isCartEmpry, setCartEmpry] = useState(true);

 console.log(goodInCart);

  useEffect (()=>{
    dispatch(CartActions.fetchCart());
   },[]);
  
   const data = goodInCart.map( (goodInCart) => {
    return {
      id: goodInCart.id,
      count: goodInCart.count,
      lable: goodInCart.good.label,
      price: goodInCart.good.price,
      img: goodInCart.good.img,
    }
  } );
console.log(data);

  useEffect(() => {
    if (data.length === 0) {
      setCartEmpry(false);
    } else setCartEmpry(true);
  }, [data, isCartEmpry]);

  // const buttonAddHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const id: number = +event.currentTarget.id;
  //   addGoodToCart(id);
  // };
  // const buttonRemoveHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const id: number = +event.currentTarget.id;
  //   removeGoodToCart(id);
  // };
  // const buttonRemoveHandlerAll = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   const id: number = +event.currentTarget.id;
  //   removeGoodToCartAll(id);
  // };

  const columns = [
    {
      title: "id товара",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Изображение",
      dataIndex: "img",
      key: "id",
      render: (img) => <Image width={70} src={img} />,
    },
    {
      title: "Товар",
      dataIndex: "label",
      key: "id",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Колличество",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <>
            {/* <button id={id} onClick={buttonAddHandler}>
              +
            </button> */}
            <span className="cart-count">{record.count}</span>
            {/* <button id={id} onClick={buttonRemoveHandler}>
              -
            </button> */}
          </>
        );
      },
    },
    {
      title: "Сумма",
      dataIndex: "price",
      key: "id",
      render: (price, record) => {
        const totalP = +record.count * +price;
        return <span>{totalP}</span>;
      },
    },

  ];

  return (
    <>
      {!isCartEmpry ? (
        <div>нет товаров</div>
      ) : (
        <>
          <div>
            {
              <Table
                dataSource={data}
                columns={columns}
                pagination={false}
              ></Table>
            }
          </div>
          <div>
            Сумма:
            {data.reduce((sum, good) => {
              if (typeof good.price === "undefined") {
                return 0;
              } else {
                return sum + good.count * +good.price;
              }
            }, 0)}
          </div>
        </>
      )}
    </>
  );
};