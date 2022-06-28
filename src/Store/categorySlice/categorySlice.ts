import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATUSES } from 'Components/Constants'
import { Good,Api } from "Api/api";


const api= new Api ();

export interface State {
  category:{ items: Good[]; total: number };
  loadStatus: LOAD_STATUSES;
}
const initialState: State = {
  category:{
    items:[
      {categoryTypeId:'',
  id:'',
  img:'',
  label:'',
  price:NaN,}
    ],
 total:NaN
  
  },
  loadStatus:LOAD_STATUSES.UNKNOWN
};


const fetchCategory=createAsyncThunk("Category/fetchCategory", api.getGoodsByCategory);


export const {reducer}=createSlice({
  name:'category',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchCategory.pending,(state)=>{
       state.loadStatus = LOAD_STATUSES.LOADING;
    })
    builder.addCase(fetchCategory.rejected,(state)=>{
       state.loadStatus = LOAD_STATUSES.ERROR;
    })
    builder.addCase(fetchCategory.fulfilled,(state,action)=>{
      state.category = action.payload;
       state.loadStatus = LOAD_STATUSES.LOADED;
    })

  }

})

export const actions = {
  fetchCategory
};
