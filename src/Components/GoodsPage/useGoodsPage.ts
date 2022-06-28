import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { actions,selectorsAllGoods } from 'Store/goodsSlice';
import { actionsCategories} from 'Store/categoriesSlice';
import { AppDispatch } from 'Store/store';


export const useGoodsPage = () => {
  const dispatch=useDispatch<AppDispatch>()
  const allGoods=useSelector(selectorsAllGoods.getMapGoods)
  const loading=useSelector(selectorsAllGoods.getIsLoadingSeletor)
  const loaded=useSelector(selectorsAllGoods.getIsLoadedSeletor)
  const error=useSelector(selectorsAllGoods.getIsErrorSeletor)

  useEffect (()=>{
   dispatch(actions.fetchAllGoods())
   dispatch(actionsCategories.actions.fetchCategories())
  },[dispatch]);
  return {
    allGoods,
    loading,
    loaded,
    error,
  };
};
