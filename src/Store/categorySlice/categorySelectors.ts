import { LOAD_STATUSES } from "Components/Constants";
import { rootStore } from "Store/store";
import { State } from "./categorySlice";
import { getCategories } from "Store/categoriesSlice/categoriesSelectors";

export const getCategorySlice = (state: rootStore): State => state.category;
export const getLoadStatusSlice = (state: rootStore): LOAD_STATUSES =>
  getCategorySlice(state).loadStatus;
  
  export const getCategory = (state: rootStore) => getCategorySlice(state).category;
  export const getIsLoadingSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
  }
   export const getIsLoadedSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
  }
  export const getIsErrorSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
  }

   export const getTransformCategory=(state:rootStore)=>{

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

  