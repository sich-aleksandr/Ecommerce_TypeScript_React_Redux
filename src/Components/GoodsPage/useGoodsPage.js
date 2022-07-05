import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { Spinner } from 'Components/commons/spinner';
import { ErrorMassage } from 'Components/commons/errorMassage';
import { useSelector, useDispatch } from "react-redux";
import { actions,selectorsAllGoods } from 'Store/goodsSlice';
import { actionsCategories} from 'Store/categoriesSlice';

const columns=[
  {
    title:'№',
    dataIndex:'id',
    key:'id'
  },
  {
    title:'Category',
    dataIndex:'categoryLabel',
    key:'categoryTypeId'
  },
  {
    title:'Goods',
    dataIndex:'label',
    sorter: true,
    key:'id',
    render:(label, record)=>{return <Link to={record.id}>{label}</Link>}
  },
  {
    title:'Description',
    dataIndex:'description',
    key:'id'
  },
  {
    title:'Price',
    dataIndex:'price',
    sorter: true,
    key:'id'
  }
]

export const GoodsPage=()=>{

  const dispatch=useDispatch()
  const allGoods=useSelector(selectorsAllGoods.getMapGoods)
  const allGoodsTotal=useSelector(selectorsAllGoods.getAllGoodsTotal)
  const loading=useSelector(selectorsAllGoods.getIsLoadingSeletor)
  const loaded=useSelector(selectorsAllGoods.getIsLoadedSeletor)
  const error=useSelector(selectorsAllGoods.getIsErrorSeletor)
  const [itemsData, setitemsData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect (()=>{
   dispatch(actions.fetchAllGoods({limit:'10', offset:'0'}));
   dispatch(actionsCategories.actions.fetchCategories());
   document.title = 'Все товары';
  },[]);

  useEffect (()=>{
    setitemsData(allGoods)
  },[allGoods]);


  const handleTableChange = (newPagination, filters, sorter) => {
    let orderType;
    if (sorter.order === "ascend") {
      orderType = 'asc'
    } if (sorter.order === "descend") {
      orderType = 'desc'
    }  else orderType = undefined

    setPagination({current:newPagination.current, pageSize:newPagination.pageSize})
    dispatch(actions.fetchAllGoods({
      limit:newPagination.pageSize.toString(),
       offset:(newPagination.pageSize*(newPagination.current-1)).toString(),
       sortBy:sorter.field, 
       sortDirection: sorter.order,
      }))
  }
 
  return (
    <>
    {loading&&<Spinner/>}
    {error&&<ErrorMassage/>
    }
    {loaded&&<Table dataSource={itemsData} onChange={handleTableChange}  columns={columns}  pagination={
      {current:pagination.current,
        pageSize:pagination.pageSize,
      
      total:allGoodsTotal}}></Table>}


    
    </>
  )
}