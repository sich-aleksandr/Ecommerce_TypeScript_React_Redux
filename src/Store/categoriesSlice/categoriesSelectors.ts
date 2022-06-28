import { LOAD_STATUSES } from '../../Components/Constants'
import { rootStore } from "../store";
import { State } from "./categorySliceType";


export const getCategoriesSlice = (state: rootStore): State => state.categories;
export const getLoadStatusSlice = (state: rootStore): LOAD_STATUSES =>
  getCategoriesSlice(state).loadStatus;
  export const getCategories = (state: rootStore) => getCategoriesSlice(state).categories;

  export const getIsLoadingSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
  }
   export const getIsLoadedSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
  }
  export const getIsErrorSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
  }
  
  export const getTrancformCategory=(state:rootStore)=>{

    const mapCategories=getCategories(state);
   
    const {categories}=mapCategories;

    return categories

  }