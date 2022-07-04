import { LOAD_STATUSES } from "Components/Constants";
import { RootStore } from "../store";
import { State } from './popularCategoriesSlice'

export const getPopularCategoriesSlice = (state: RootStore): State => state.popularCategories;
export const getLoadStatusSlice = (state: RootStore): LOAD_STATUSES =>
  getPopularCategoriesSlice(state).loadStatus;
  export const getPopularCategories = (state: RootStore) => getPopularCategoriesSlice(state).popularCategories;

  export const getIsLoadingSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
  }
   export const getIsLoadedSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
  }
  export const getIsErrorSeletor = (state:RootStore) =>  {
    return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
  }