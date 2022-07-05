import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { actions, selectorsPopularCategories } from 'Store/popularCategoriesSlice'
import { AppDispatch } from 'Store/store';

export const useCategoryPage = () => {
  const dispatch=useDispatch<AppDispatch>()
  const popularCategories=useSelector(selectorsPopularCategories.getPopularCategories)
  
  const loading=useSelector(selectorsPopularCategories.getIsLoadingSeletor)
  const loaded=useSelector(selectorsPopularCategories.getIsLoadedSeletor)
  const error=useSelector(selectorsPopularCategories.getIsErrorSeletor)
  useEffect(() => {
    document.title = "Main page";
  },[]);
  useEffect (()=>{
    dispatch(actions.fetchPopularCategories())
  },[dispatch]);

  return {
    popularCategories,
    loading,
    loaded,
    error,
  };
};