import { Divider, List, Button } from "antd";
import { CardItem } from "../Card";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Spinner } from "Components/commons/spinner";
import { ErrorMassage } from "Components/commons/errorMassage";
import { useSelectedCategoryPage } from "./useSelectedCategoryPage";
import { Link } from "react-router-dom";
import { useEffect } from 'react'

export const SelectedCategoryPage: React.FC = () => {
  const data = useSelectedCategoryPage();

  useEffect(() => {
    document.title = data.category[0].categoryLabel;
  }, [data]);

  return (
    <>
      {data.loading && <Spinner />}
      {data.error && <ErrorMassage />}

      {data.loaded && (
        <>
          <Divider>
            <div>
              <Button type="text" onClick={data.goBack}>
                <ArrowLeftOutlined />
              </Button>
              {data.category[0].categoryLabel}
            </div>
          </Divider>

          <Divider></Divider>
          <List
            grid={{ gutter: 40, column: 4 }}
            dataSource={data.category}
            renderItem={(item) => (
              <div>
                <List.Item>
                  <Link to={item.id}>
                    <CardItem
                      label={item.label}
                      id={item.id}
                      price={+item.price}
                      img={item.img}
                    />
                  </Link>
                </List.Item>
              </div>
            )}
          ></List>
        </>
      )}
    </>
  );
};
