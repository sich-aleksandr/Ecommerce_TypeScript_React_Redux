import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATUSES } from "Components/Constants";
import { Good, Api } from "Api/api";

const api= new Api ();

export interface State {
  goods:{items: Good[],total:number };
  loadStatus: LOAD_STATUSES;
}

const initialState: State = {
  goods:{
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

const fetchAllGoods=createAsyncThunk("AllGoods/fetchAllGoods", api.getGoods);

export const {reducer}=createSlice({
  name:'goods',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchAllGoods.pending,(state)=>{
       state.loadStatus = LOAD_STATUSES.LOADING;
    })
    builder.addCase(fetchAllGoods.rejected,(state)=>{
       state.loadStatus = LOAD_STATUSES.ERROR;
    })
    builder.addCase(fetchAllGoods.fulfilled,(state,action)=>{
      state.goods = action.payload;
       state.loadStatus = LOAD_STATUSES.LOADED;
    })

  }

})

export const actions = {
  fetchAllGoods
};
