import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATUSES } from "Components/Constants";
import {Category, Good,Api } from "Api/api";

const api= new Api ();

export interface State {
  popularCategories:{ category: Category; items: Good[] }[];
  loadStatus: LOAD_STATUSES;
}

const initialState: State = {
  popularCategories:[{
    items:[
      {categoryTypeId:'',
      description:'',
  id:'',
  img:'',
  label:'',
  price:'',}
    ],
 category:{
   type:'',
   label:'',
   id:'',}
  
  }],
  loadStatus:LOAD_STATUSES.UNKNOWN
};

const fetchPopularCategories=createAsyncThunk("Categories/fetchPopularCategories", api.getPopularCategories);

export const {reducer}=createSlice({
  name:'categories',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchPopularCategories.pending,(state)=>{
       state.loadStatus = LOAD_STATUSES.LOADING;
    })
    builder.addCase(fetchPopularCategories.rejected,(state)=>{
       state.loadStatus = LOAD_STATUSES.ERROR;
    })
    builder.addCase(fetchPopularCategories.fulfilled,(state,action)=>{
      state.popularCategories = action.payload;
       state.loadStatus = LOAD_STATUSES.LOADED;
    })

  }

})

export const actions = {
  fetchPopularCategories
};
