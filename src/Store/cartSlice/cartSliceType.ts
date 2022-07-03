import { Api, GoodInCart } from "Api/api";
import { LOAD_STATUSES } from "Components/Constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const api= new Api ();


export interface State {
  cart: GoodInCart[];
  loadStatus: LOAD_STATUSES;
};

const initialState: State = {
  cart: [],
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

const fetchCart=createAsyncThunk("Cart/fetchCart", api.getCart);


export const { name, actions, reducer } = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: string}>) => {
      const goodIdx = state.cart.findIndex(
        (good) => good.id === action.payload.id
      );

      if (goodIdx === -1) {
        return {
          ...state,
          cart: [...state.cart, { id: action.payload.id,  count: 1 }]
        };
      }

      return {
        ...state,
        cart: state.cart.map((good) =>
          good.id === action.payload.id
            ? {
                ...good,
                count: good.count + 1
              }
            : good
        )
      };
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      return {
        ...state,
        cart: state.cart
          .map((good) =>
            good.id === action.payload.id
              ? {
                  ...good,
                  count: good.count - 1
                }
              : good
          )
          .filter((good) => good.count > 0)
      };
    },
    removeFromCartAll: (state, action: PayloadAction<{ id: string }>) => {
      return {
        ...state,
        cart: state.cart
          .map((good) =>
            good.id === action.payload.id
              ? {
                  ...good,
                  count: 0
                }
              : good
          )
          .filter((good) => good.count > 0)
      };
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchCart.pending,(state)=>{
       state.loadStatus = LOAD_STATUSES.LOADING;
    })
    builder.addCase(fetchCart.rejected,(state)=>{
       state.loadStatus = LOAD_STATUSES.ERROR;
    })
    builder.addCase(fetchCart.fulfilled,(state,action)=>{
      state.cart = action.payload.cart;
       state.loadStatus = LOAD_STATUSES.LOADED;
    })

  }
});


export const actionsFetch = {
  fetchCart
};