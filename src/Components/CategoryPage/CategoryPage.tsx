import React from 'react'
import { GoodCategory } from 'Components/GoodCategory';
import { Row } from 'antd';
import { Spinner } from 'Components/commons/spinner';
import { ErrorMassage } from 'Components/commons/errorMassage';
import { useCategoryPage } from './useCategoryPage';

export const CategoryPage:React.FC=()=>{

  const data=useCategoryPage()
  
return (<Row >
  {data.loading&&<Spinner/>}
  {data.error&&<ErrorMassage/>
  }
  {data.loaded&&data.popularCategories.map(({category:{id,label},items})=><div key={id}>
    <GoodCategory label={label} items={items}/>
    </div>)}
  
  </Row>)


}
