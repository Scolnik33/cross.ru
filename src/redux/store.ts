import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { ordersReducer } from "./slices/order";
import { sneakersReducer } from "./slices/sneaker";

const store = configureStore({
    reducer: {
        auth: authReducer,
        sneaker: sneakersReducer,
        orders: ordersReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;