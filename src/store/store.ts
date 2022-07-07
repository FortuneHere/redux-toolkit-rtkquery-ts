import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { postAPI } from "../service/PostService";
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
  userReducer,
  // RTK Query "PostService.ts"
  [postAPI.reducerPath]: postAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(postAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']