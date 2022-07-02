import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { useGoodsPage } from './useGoodsPage';
import { Spinner } from 'Components/commons/spinner';
import { ErrorMassage } from 'Components/commons/errorMassage';

export const GoodsPage:React.FC=()=>{

  const data=useGoodsPage()

  useEffect(() => {
    document.title = 'Все товары';
  }, [data]);


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
      key:'id',
      render:(label:string, record:any)=>{return <Link to={record.id}>{label}</Link>}
    },
    {
      title:'Description',
      dataIndex:'description',
      key:'id'
    },
    {
      title:'Price',
      dataIndex:'price',
      key:'id'
    }
  ]
  return (
    <>
    {data.loading&&<Spinner/>}
    {data.error&&<ErrorMassage/>
    }
    {data.loaded&&<Table dataSource={data.allGoods} columns={columns} pagination={{total:220,pageSize:10}}></Table>}


    
    </>
  )
}