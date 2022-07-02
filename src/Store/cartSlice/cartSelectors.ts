import { LOAD_STATUSES } from "Components/Constants";
import { rootStore } from "../store";
import { State } from "./cartSliceType";

export const getCartSlice = (state: rootStore): State => state.cart;

export const getLoadStatus = (state: rootStore): LOAD_STATUSES =>
  getCartSlice(state).loadStatus;

export const getCart = (state: rootStore): State["cart"] =>
  getCartSlice(state).cart;

export const getGoodById = (id: string) => (
  state: rootStore
): State["cart"][number] | undefined => {
  return getCart(state).find(({ id: cartId }) => cartId === id);
};
