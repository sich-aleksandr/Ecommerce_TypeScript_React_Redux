import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./categoriesSlice";
import { reducer as categoryReducer} from './categorySlice'
import { reducer as allGoodsReducer } from './goodsSlice'
import { reducer as popularCategoriesReducer} from './popularCategoriesSlice'
import { reducer as authReducer} from './authoriationSlice'


const rootReducer = combineReducers({
  categories: categoriesReducer,
  category: categoryReducer,
  goods:allGoodsReducer,
  popularCategories:popularCategoriesReducer,
  userAuth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: false
});

export type AppDispatch = typeof store.dispatch;
export type rootStore = ReturnType<typeof rootReducer>;
