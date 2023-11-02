import { combineReducers } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import authReducer from '../slices/authSlice'
import postReducer from '../slices/postSlice'
const rootReducer = combineReducers({

  auth: authReducer,
 post: postReducer,
  
  [authApi.reducerPath]: authApi.reducer,
 
});

export default rootReducer;