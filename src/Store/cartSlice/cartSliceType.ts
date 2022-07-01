import { LOAD_STATUSES } from "Components/Constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  loadStatus: LOAD_STATUSES;
  cart: {
    id: number;
    name?: string;
    img?: string;
    price?: string;
    count: number;
  }[];
}
const initialState: State = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  cart: [
 
  ]
};

export const { name, actions, reducer } = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: number, name?: string, img?: string, price?: string }>) => {
      const goodIdx = state.cart.findIndex(
        (good) => good.id === action.payload.id
      );

      if (goodIdx === -1) {
        return {
          ...state,
          cart: [...state.cart, { id: action.payload.id, name:action.payload.name, img:action.payload.img, price:action.payload.price, count: 1 }]
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

    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
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
    removeFromCartAll: (state, action: PayloadAction<{ id: number }>) => {
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
  }
});
