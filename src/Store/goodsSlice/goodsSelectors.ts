import { LOAD_STATUSES } from "Components/Constants";
import { rootStore } from "../store";
import { State } from './goodsSlice'
import { getCategories } from "Store/categoriesSlice/categoriesSelectors";

export const getAllGoodsSlice = (state: rootStore): State => state.goods;
export const getLoadStatusSlice = (state: rootStore): LOAD_STATUSES =>
  getAllGoodsSlice(state).loadStatus;
  export const getAllGoods = (state: rootStore) => getAllGoodsSlice(state).goods

  export const getIsLoadingSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
  }
   export const getIsLoadedSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
  }
  export const getIsErrorSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
  }

  export const getMapGoods=(state:rootStore)=>{

    const goods=getAllGoods(state);
    const mapCategories=getCategories(state);
    const {items}=goods
    const {categories}=mapCategories;

    return items.map((item)=>({...item,
      categoryLabel:
    categories.find(
      ({id})=>id===item.categoryTypeId)?.label??'Неизвестная категория'
    })
    )

  
  }
  