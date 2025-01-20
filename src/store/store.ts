import {configureStore} from "@reduxjs/toolkit"
import editSlice from "./slice/editSlice";
// import { editSlice } from './slices/editSlice';


export const Store = () => {
    return configureStore({
      reducer: {
        edit: editSlice,

      },
    })
  }




// Infer the type of makeStore
export type AppStore = ReturnType<typeof Store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']