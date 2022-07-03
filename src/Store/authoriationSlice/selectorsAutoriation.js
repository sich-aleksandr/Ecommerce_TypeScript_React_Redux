import { LOAD_STATUSES } from "Components/Constants";

export const getUserAuthSlice = (state) => state.userAuth;

export const getLoadStatus = (state) => state.userAuth.loadStatus;
export const getLoadIsAuth = (state) => state.userAuth.userAuth;

export const isLoading = (state) =>
  getLoadStatus(state) === LOAD_STATUSES.LOADING;

export const isError = (state) => getLoadStatus(state) === LOAD_STATUSES.ERROR;

export const isLoaded = (state) =>
  getLoadStatus(state) === LOAD_STATUSES.LOADED;
