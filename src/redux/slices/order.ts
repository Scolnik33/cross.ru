import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { RootState } from "../store";
import { OrdersType } from "../../types/OrdersType";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface OrdersSLiceState {
  orders: {
    itemsOrders: OrdersType[];
    statusOrders: Status;
  };
}

export const fetchOrders = createAsyncThunk<OrdersType[], string>(
  "getOrders",
  async (userId) => {
    const { data } = await axios.get<OrdersType[]>(`/getOrders/${userId}`);

    return data;
  }
);

export const fethcAllOrders = createAsyncThunk(
  "getAllOrders",
  async () => {
    const { data } = await axios.get<OrdersType[]>(`/getAllOrders`);

    return data;
  }
);

export const fetchCreateOrder = createAsyncThunk<OrdersType[], any>(
  "createOrder",
  async (params) => {
    const { data } = await axios.post<OrdersType[]>("/createOrder", params);

    return data;
  }
);

const initialState: OrdersSLiceState = {
  orders: {
    itemsOrders: [],
    statusOrders: Status.LOADING,
  },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.orders.itemsOrders = [];
      state.orders.statusOrders = Status.LOADING;
    }),
      builder.addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<OrdersType[]>) => {
          state.orders.itemsOrders = action.payload;
          state.orders.statusOrders = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchOrders.rejected, (state) => {
        state.orders.itemsOrders = [];
        state.orders.statusOrders = Status.ERROR;
      }),
      builder.addCase(fethcAllOrders.pending, (state) => {
      state.orders.itemsOrders = [];
      state.orders.statusOrders = Status.LOADING;
    }),
      builder.addCase(
        fethcAllOrders.fulfilled,
        (state, action: PayloadAction<OrdersType[]>) => {
          state.orders.itemsOrders = action.payload;
          state.orders.statusOrders = Status.SUCCESS;
        }
      ),
      builder.addCase(fethcAllOrders.rejected, (state) => {
        state.orders.itemsOrders = [];
        state.orders.statusOrders = Status.ERROR;
      }),
      builder.addCase(fetchCreateOrder.pending, (state) => {
        state.orders.itemsOrders = [];
        state.orders.statusOrders = Status.LOADING;
      }),
      builder.addCase(
        fetchCreateOrder.fulfilled,
        (state, action: PayloadAction<OrdersType[]>) => {
          state.orders.itemsOrders = action.payload;
          state.orders.statusOrders = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchCreateOrder.rejected, (state) => {
        state.orders.itemsOrders = [];
        state.orders.statusOrders = Status.ERROR;
      });
  },
});

export const selectOrders = (state: RootState) => state.orders.orders;

export const ordersReducer = ordersSlice.reducer;
