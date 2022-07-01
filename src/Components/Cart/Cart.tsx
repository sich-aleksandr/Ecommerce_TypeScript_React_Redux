import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as CartActions, CartSelectors } from "Store/cartSlice";
import { Table, Image } from "antd";

export const GoodsCart: React.FC = () => {
  const dispatch = useDispatch();
  const goodInCart = useSelector(CartSelectors.getCart);
  const [isCartEmpry, setCartEmpry] = useState(true);
  const addGoodToCart = (id: number) => dispatch(CartActions.addToCart({ id }));
  const removeGoodToCart = (id: number) =>
    dispatch(CartActions.removeFromCart({ id }));
  const removeGoodToCartAll = (id: number) =>
    dispatch(CartActions.removeFromCartAll({ id }));
  const data = goodInCart;

  useEffect(() => {
    if (data.length === 0) {
      setCartEmpry(false);
    } else setCartEmpry(true);
  }, [data, isCartEmpry]);

  const buttonAddHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id: number = +event.currentTarget.id;
    addGoodToCart(id);
  };
  const buttonRemoveHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id: number = +event.currentTarget.id;
    removeGoodToCart(id);
  };
  const buttonRemoveHandlerAll = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const id: number = +event.currentTarget.id;
    removeGoodToCartAll(id);
  };

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
      render: (img: string) => <Image width={70} src={img} />,
    },
    {
      title: "Товар",
      dataIndex: "name",
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
      render: (id: string, record: any) => {
        return (
          <>
            <button id={id} onClick={buttonAddHandler}>
              +
            </button>
            <span className="cart-count">{record.count}</span>
            <button id={id} onClick={buttonRemoveHandler}>
              -
            </button>
          </>
        );
      },
    },
    {
      title: "Сумма",
      dataIndex: "price",
      key: "id",
      render: (price: string, record: any) => {
        const totalP = +record.count * +price;
        return <span>{totalP}</span>;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id: string) => {
        return (

            <button id={id} onClick={buttonRemoveHandlerAll}>
              X
            </button>

        );
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
