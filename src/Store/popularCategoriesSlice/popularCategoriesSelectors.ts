import { LOAD_STATUSES } from "Components/Constants";
import { rootStore } from "../store";
import { State } from './popularCategoriesSlice'

export const getPopularCategoriesSlice = (state: rootStore): State => state.popularCategories;
export const getLoadStatusSlice = (state: rootStore): LOAD_STATUSES =>
  getPopularCategoriesSlice(state).loadStatus;
  export const getPopularCategories = (state: rootStore) => getPopularCategoriesSlice(state).popularCategories;

  export const getIsLoadingSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
  }
   export const getIsLoadedSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
  }
  export const getIsErrorSeletor = (state:rootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
  }