import { LOAD_STATUSES } from "Components/Constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  loadStatus: LOAD_STATUSES;
  cart: {
    id: number;
    count: number;
  }[];
}
const initialState: State = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  cart: [
    {
      id: NaN,
      count: 0
    }
  ]
};

export const { name, actions, reducer } = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: number }>) => {
      const goodIdx = state.cart.findIndex(
        (good) => good.id === action.payload.id
      );

      if (goodIdx === -1) {
        return {
          ...state,
          cart: [...state.cart, { id: action.payload.id, count: 1 }]
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
    }
  }
});
