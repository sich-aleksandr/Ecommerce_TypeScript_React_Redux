import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATUSES } from '../../Components/Constants'
import { Api, Category } from "../../Api/api";

const api= new Api ();
export interface State {
  categories:{categories:Category[]};
  loadStatus: LOAD_STATUSES;
}

const initialState: State = {
  categories:{
    categories:[
      {
  id:'',
  type:'',
  label:''}
    ],
  },
  loadStatus:LOAD_STATUSES.UNKNOWN
};

const fetchCategories=createAsyncThunk("Categories/fetchCategories", api.getCategories);


export const {reducer}=createSlice({
  name:'categories',
  initialState, 
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchCategories.pending,(state)=>{
       state.loadStatus = LOAD_STATUSES.LOADING;
    })
    builder.addCase(fetchCategories.rejected,(state)=>{
       state.loadStatus = LOAD_STATUSES.ERROR;
    })
    builder.addCase(fetchCategories.fulfilled,(state,action)=>{
      state.categories = action.payload;
       state.loadStatus = LOAD_STATUSES.LOADED;
    })

  }

})

export const actions = {
  fetchCategories
};
