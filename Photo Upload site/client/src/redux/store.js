// Besiccaly We Will Handel Login state In Globally
import {createSlice,configureStore} from '@reduxjs/toolkit'
//createSlice: This function comes from the @reduxjs/toolkit package.
//It’s a convenient way to create a Redux slice, which defines a piece of your application state along with its associated reducers.
// A slice typically includes actions and reducers for a specific part of your app.

//configureStore: Another gem from the Redux Toolkit! This function helps you configure your Redux store.//
// It combines your slices (created using createSlice) and sets up middleware, such as Thunk or Saga, if needed.
// The store is where your entire application state lives.
const authSlice=createSlice({
    name:"auth",//initiasate is use to how many value are required inthis time
    initialState:{
      islogin:false
    },
    // in reducer we will create action plus reducer in same function
    reducers:{
      login(state){
        state.islogin=true;// when login function will call then state is true
      },
      logout(state){
        state.islogin=false;
      },
    },
})
export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});