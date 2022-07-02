import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useEffect,useState} from 'react'
import {actionsCategories,selectorsCategories} from 'Store/categoriesSlice'
import { AppDispatch } from 'Store/store';
import type { DrawerProps, } from 'antd';


export const useMenu= () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const menuItems=useSelector(selectorsCategories.getTrancformCategory);
  const loading=useSelector(selectorsCategories.getIsLoadingSeletor)
  const loaded=useSelector(selectorsCategories.getIsLoadedSeletor)
  const error=useSelector(selectorsCategories.getIsErrorSeletor)
  const dispatch=useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(actionsCategories.actions.fetchCategories())
  
  },[])
  return {
    menuItems,
    loading,
    loaded,
    error,visible,placement,showDrawer,onClose
  };
};