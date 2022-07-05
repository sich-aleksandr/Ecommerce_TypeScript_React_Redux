import { LOAD_STATUSES } from "Components/Constants";
import { RootStore } from "Store/store";
import { State } from "./categorySlice";
import { getCategories } from "Store/categoriesSlice/categoriesSelectors";

export const getCategorySlice = (state: RootStore): State => state.category;
export const getLoadStatusSlice = (state: RootStore): LOAD_STATUSES =>
  getCategorySlice(state).loadStatus;
  
  export const getCategory = (state: RootStore) => getCategorySlice(state).category;
  export const getIsLoadingSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
  }
   export const getIsLoadedSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
  }
  export const getIsErrorSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
  }

   export const getTransformCategory=(state:RootStore)=>{

    const category=getCategory(state);
    const mapCategories=getCategories(state);
    const {items}=category
    const {categories}=mapCategories;

    return items.map((item)=>({...item,
      categoryLabel:
    categories.find(
      ({id})=>id===item.categoryTypeId)?.label??'Неизвестная категория'
    })
    )

  
  }

  