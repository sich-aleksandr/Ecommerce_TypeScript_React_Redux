import { useSelector, useDispatch } from "react-redux";
import {useParams,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {actions,selectorsCategory} from 'Store/categorySlice'
import { AppDispatch } from 'Store/store';


export const useSelectedCategoryPage = () => {
  const {idCategory}=useParams() as {idCategory:string};
  const category=useSelector(selectorsCategory.getTransformCategory)
  const dispatch=useDispatch<AppDispatch>()
  const navigate=useNavigate()
  const loading=useSelector(selectorsCategory.getIsLoadingSeletor)
  const error=useSelector(selectorsCategory.getIsErrorSeletor)
  const loaded=useSelector(selectorsCategory.getIsLoadedSeletor)



  useEffect (()=>{
    dispatch(actions.fetchCategory(idCategory))
  },[idCategory, dispatch]);

  const goBack=()=>navigate(-1);

  return {
    category,
    loading,
    error,
    loaded,
    goBack
  };
};