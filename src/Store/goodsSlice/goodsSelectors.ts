import { LOAD_STATUSES } from "Components/Constants";
import { RootStore } from "../store";
import { State } from "./goodsSlice";
import { getCategories } from "Store/categoriesSlice/categoriesSelectors";

export const getAllGoodsSlice = (state: RootStore): State => state.goods;
export const getLoadStatusSlice = (state: RootStore): LOAD_STATUSES =>
  getAllGoodsSlice(state).loadStatus;
export const getAllGoods = (state: RootStore) => getAllGoodsSlice(state).goods;
export const getAllGoodsTotal = (state: RootStore) => getAllGoodsSlice(state).goods.total;

export const getIsLoadingSeletor = (state: RootStore) => {
  return getLoadStatusSlice(state) === LOAD_STATUSES.LOADING;
};
export const getIsLoadedSeletor = (state: RootStore) => {
  return getLoadStatusSlice(state) === LOAD_STATUSES.LOADED;
};
export const getIsErrorSeletor = (state: RootStore) => {
  return getLoadStatusSlice(state) === LOAD_STATUSES.ERROR;
};

export const getMapGoods = (state: RootStore) => {
  const goods = getAllGoods(state);
  const mapCategories = getCategories(state);
  const { items } = goods;
  const { categories } = mapCategories;

  return items.map((item) => ({
    ...item,
    categoryLabel:
      categories.find(({ id }) => id === item.categoryTypeId)?.label ??
      "Неизвестная категория",
  }));
};
