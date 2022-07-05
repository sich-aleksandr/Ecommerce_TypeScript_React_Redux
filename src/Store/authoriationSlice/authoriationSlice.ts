import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATUSES } from "Components/Constants";
import { Api, Login } from "Api/api";


const api= new Api ();

export const getUserAuth = createAsyncThunk("UserAuth/getUserAuth",
async (data:Login) => {
  const result = await api.postLogin(data);
  return result;
})


export const { name, actions, reducer } = createSlice({
  name: "userAuth",
  initialState: {
    user: {
      login: '',
      token: '',
    },
    userAuth: false,
    loadStatus:LOAD_STATUSES.UNKNOWN,
  },
  reducers: {
    userLogOut: (state) => {
      return {user: {
        login: '',
        token: '',
      }, userAuth: false,
      loadStatus:LOAD_STATUSES.UNKNOWN };
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getUserAuth.pending,(state)=>{
       state.loadStatus = LOAD_STATUSES.LOADING;
    })
    builder.addCase(getUserAuth.rejected,(state)=>{
       state.loadStatus = LOAD_STATUSES.ERROR;
    })
    builder.addCase(getUserAuth.fulfilled,(state,action)=>{
      state.user = action.payload;
      state.userAuth = true;
       state.loadStatus = LOAD_STATUSES.LOADED;
    })

  }
});

export const actionss = { ...actions, getUserAuth }
