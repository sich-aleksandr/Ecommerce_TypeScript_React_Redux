import { LOAD_STATUSES } from '../../Components/Constants'
import { RootStore } from "../store";
import { State } from "./categorySliceType";


export const getCategoriesSlice = (state: RootStore): State => state.categories;
export const getLoadStatusSlice = (state: RootStore): LOAD_STATUSES =>
  getCategoriesSlice(state).loadStatus;
  export const getCategories = (state: RootStore) => getCategoriesSlice(state).categories;

  export const getIsLoadingSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
  }
   export const getIsLoadedSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
  }
  export const getIsErrorSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
  }
  
  export const getTrancformCategory=(state:RootStore)=>{

    const mapCategories=getCategories(state);
   
    const {categories}=mapCategories;

    return categories

  }