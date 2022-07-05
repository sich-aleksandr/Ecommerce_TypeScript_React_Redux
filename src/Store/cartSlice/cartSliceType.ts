import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATUSES } from "Components/Constants";
import { Good, GoodInCart, Api } from "Api/api";
import { getGoodById } from "./cartSelectors";
import { AppDispatch, RootStore } from "../store";

const api= new Api ();


export interface State {
  cart: GoodInCart[];
  loadStatus: LOAD_STATUSES;
}

const initialState: State = {
  cart: [],
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

const fetchCart = createAsyncThunk("cart/getCart", api.getCart);
const addToCart = createAsyncThunk<void, { good: Good, count: number },{state:RootStore,dispatch:AppDispatch}>(
    "cart/addToCart",
    async ({good}, { getState, dispatch }) => {
      const id = good.id;
      const goodInCart = getGoodById(good.id)(getState()); 
      const currentCounter = goodInCart?.count ?? 0; 
      await api.putCart({good, count:currentCounter + 1, id});
      dispatch(fetchCart());
    }
);
const decGoodInCart = createAsyncThunk<void, { good: Good, count: number },{state:RootStore,dispatch:AppDispatch}>(
    "cart/incrGoodInCart",
    async ({good}, { getState, dispatch }) => {
      const id = good.id;
      const goodInCart:any = getGoodById(good.id)(getState()); 
      const currentCounter = goodInCart?.count ?? 0; 
      await api.putCart({good, count:currentCounter - 1, id});
      dispatch(fetchCart());
    }
);
const removeGoodInCart = createAsyncThunk<void, { good: Good, count: number },{state:RootStore,dispatch:AppDispatch}>(
  "cart/incrGoodInCart",
  async ({good}, { getState, dispatch }) => {
    const id = good.id; 
    await api.putCart({good, count: 0, id});
    dispatch(fetchCart());
  }
);

export const actions = {
  fetchCart,
  addToCart,
  decGoodInCart,
  removeGoodInCart,
};



export const { reducer } = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });
    builder.addCase(fetchCart.fulfilled, (state:any, action) => {
      state.cart = action.payload;
      state.loadStatus = LOAD_STATUSES.LOADED;
    });
  },
});