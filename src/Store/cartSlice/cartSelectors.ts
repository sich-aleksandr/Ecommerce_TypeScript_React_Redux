import { LOAD_STATUSES } from "Components/Constants";
import { RootStore } from "../store";
import { State } from "./cartSliceType";

export const getCartSlice = (state: RootStore): State => state.cart;
export const getLoadStatus = (state: RootStore): LOAD_STATUSES =>
    getCartSlice(state).loadStatus;

export const getGoodsInCart = (state: RootStore) =>
    getCartSlice(state).cart;

export const getGoodById = (cartId : string) => (
    state: RootStore
) => {
  return getGoodsInCart(state).find(({id}) => cartId === id);
};

export const getIsLoadingSelector = (state: RootStore) => {
  return getLoadStatus(state) === LOAD_STATUSES.LOADING;
};

export const getIsLoadedSelector = (state: RootStore) => {
  return getLoadStatus(state) === LOAD_STATUSES.LOADED;
};

export const getIsErrorSelector = (state: RootStore) => {
  return getLoadStatus(state) === LOAD_STATUSES.ERROR;
};
