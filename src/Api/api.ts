export interface Category {
  id: string;
  type: string;
  label: string;
}

export interface Login { 
  login: string; 
  password: string;
 }

export interface Good {
  categoryTypeId: string;
  description: string;
  id: string;
  img: string;
  label: string;
  price: string;
}

export interface GoodInCart {
  good: Good;
  count: number;
  id: string;
}

export interface GoodsSearch {
  ids: string; // выбрать по id, exmaple ids=1,2,3
  categoryTypeIds: string; // выбрать по id категория, example categoryTypeIds=1,2,3
  minPrice: number; // выбрать с ценой не более максимально указанной
  maxPrice: number; // выбрать с ценой не менее минимально указанной
  text: string; // выбрать по содержанию указанной подстроки в названии
  limit: number; // количество возвращаемых товаров, по умолчанию 20
  offset: number; // смещение относительно начала.
  sortBy: keyof Good; // по какому полю бек сортирует товары, по умолчанию по id
  sortDirection: "asc" | "desc"; // как сортировать asc - по возрастанию desc - по убыванию, по умолчанию asc
}

export class Api {
  endPoints = {
    goods: "/api/goods",
    categories: "/api/categories",
    popular_categories: "/api/popular_categories",
    cart: "/api/cart",
    login: "/api/login",
  };

  request = (
    url: string,
    params?: { 
      categoryTypeIds?: string; 
      ids?: string; 
      text?: string; 
  //     minPrice?: number; 
  // maxPrice?: number; 
  limit?: string; 
  offset?: string; 
  sortBy?: keyof Good; 
  sortDirection?: "asc" | "desc";
    },
    method?: any,
    data?: any,
  ) => {
    
    const urlParams = new URLSearchParams(params).toString();

    return fetch(`${url}?${urlParams}`,{
      method: method || null,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data) || null,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("some error");
    });
  };

  getGoodsByCategory = (
    categoryTypeId: string
  ): Promise<{ items: Good[]; total: number }> => {
    return this.request(this.endPoints.goods, {
      categoryTypeIds: `${categoryTypeId}`,
    });
  };
  getGoodByID = (GoodTypeId: string): Promise<{ item: Good[] }> => {
    return this.request(this.endPoints.goods, { ids: `${GoodTypeId}` });
  };
  getGoods = ({limit,offset, sortBy, sortDirection, categoryTypeIds}:{limit?:string, offset?:string, sortBy?: keyof Good,  sortDirection?: "asc" | "desc", categoryTypeIds?:string}): Promise<{ items: Good[]; total: number }> => {
    return this.request(this.endPoints.goods, { limit:limit,offset:offset, sortBy:sortBy, sortDirection:sortDirection, categoryTypeIds:categoryTypeIds });
  };
  getGoodsSearch = (text: string): Promise<{ items: Good[] }> => {
    return this.request(this.endPoints.goods, { text: `${text}` });
  };
  getCategories = (): Promise<{ categories: Category[] }> => {
    return this.request(this.endPoints.categories);
  };
  getCart = (): Promise<{ cart: GoodInCart[] }> => {
    return this.request(this.endPoints.cart);
  };
  putCart = (data:GoodInCart  ): Promise<GoodInCart> => {
    return this.request(this.endPoints.cart, {}, "PUT", data );
  };
  getPopularCategories = (): Promise<
    { category: Category; items: Good[] }[]
  > => {
    return this.request(this.endPoints.popular_categories);
  };
  postLogin = (data:Login): Promise<{ login: string; token: string }> => {
    return this.request(this.endPoints.login, {}, "POST", data );
  };
}
