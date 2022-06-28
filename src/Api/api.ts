
export interface Good{
    categoryTypeId: string,
    id:string,
    img:string,
    label:string,
    price:number,
  }
  export interface Category {
     type:string,
     label:string,
     id:string,
  }
  
  export class Api {
  
    endPoints={
      goods:'/api/goods',
      categories:'/api/categories',
      popular_categories:'/api/popular_categories',
    
    }
    
      request = (url:string, params?:{categoryTypeIds?:string,ids?:string, text?:string}) => {
    const urlParams = new URLSearchParams(params).toString();
  
    return fetch(`${url}?${urlParams}`).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('some error');
    });
  };
  /*getResource = async (url:string):Promise<{categories:Category []}> => {
      const res = await fetch(`${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
      }
      return await res.json();
    };*/
    
  getGoodsByCategory=(categoryTypeId:string):Promise<{ items: Good[]; total: number }>=>{
    return this.request(this.endPoints.goods,{categoryTypeIds:`${categoryTypeId}`})
  }
  getGoodByID=(GoodTypeId:string):Promise<{ item: Good[] }>=>{
    return this.request(this.endPoints.goods,{ids:`${GoodTypeId}`})
  }
  getGoods=():Promise<{ items: Good[]; total: number }>=>{
    return this.request(this.endPoints.goods)
  }
  getCategories=():Promise<{categories:Category []}>=>{
    return this.request(this.endPoints.categories)
  }
  getPopularCategories=():Promise<{ category: Category; items: Good[] }[]>=>{
    return this.request(this.endPoints.popular_categories)
  }
  
  }