import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionsCategories, selectorsCategories } from "Store/categoriesSlice";
import { Api } from "Api";
import { Link } from "react-router-dom";

const api = new Api();

export const GoodsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  const allCategories = useSelector(selectorsCategories.getCategories);
  useEffect(() => {
    dispatch(actionsCategories.actions.fetchCategories());
    document.title = "Все товары";
  }, []);
  const allCategoryTypeIds = "1,2,3,4,5,6,7,8,9,10,11";

  const fetchData = (params) => {
    setLoading(true);
    let orderType;
    if (params.sortOrder === "ascend") {
      orderType = "asc";
    }
    if (params.sortOrder === "descend") {
      orderType = "desc";
    } else orderType = undefined;

    let categoriesSelected;
    if (params.categoryTypeId === null || params.categoryTypeId === undefined) {
      categoriesSelected = allCategoryTypeIds;
    } else {
      categoriesSelected = params.categoryTypeId.join(",");
    }
    api
      .getGoods({
        limit: params.pagination.pageSize.toString(),
        offset: (
          params.pagination.pageSize *
          (params.pagination.current - 1)
        ).toString(),
        sortBy: params.sortField,
        sortDirection: orderType,
        categoryTypeIds: categoriesSelected,
      })
      .then((results) => {
        setData(results.items);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: results.total,
        });
      });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "categoryTypeId",
      key: "categoryTypeId",
      render: (categoryTypeId) => {
        const name = allCategories.categories.find(
          (category) => category.id === categoryTypeId
        );
        return name.label;
      },
      filters: allCategories.categories.map((category) => {
        return {
          text: category.label,
          value: category.id,
        };
      }),
    },
    {
      title: "Goods",
      dataIndex: "label",
      sorter: true,
      key: "id",
      render: (label, record) => {
        return <Link to={record.id}>{label}</Link>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
      key: "id",
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id.uuid}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
