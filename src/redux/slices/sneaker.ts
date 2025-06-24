import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { RootState } from "../store";
import { SneakersType } from "../../types/SneakersType";
import { AuthType } from "../../types/AuthType";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface SneakersSLiceState {
  sneakers: {
    itemsSneakers: SneakersType[];
    statusSneakers: Status;
  };
  user: AuthType | null;
  wish: SneakersType[];
  cart: SneakersType[];
}

export const fetchSneakers = createAsyncThunk("getSneakers", async () => {
  const { data } = await axios.get<SneakersType[]>("/getSneakers");

  return data;
});

export const fetchOneSneaker = createAsyncThunk<SneakersType, string>(
  "getOneSneaker",
  async (id) => {
    const { data } = await axios.get<SneakersType>(`/getOneSneaker/${id}`);

    return data;
  }
);

export const fetchUpdateSneaker = createAsyncThunk<
  SneakersType,
  { id: string; updateData: SneakersType }
>("updateSneaker", async ({ id, updateData }) => {
  const { data } = await axios.put<SneakersType>(
    `/updateSneaker/${id}`,
    updateData
  );

  return data;
});

export const fetchCreateSneaker = createAsyncThunk(
  "createSneaker",
  async (params) => {
    const { data } = await axios.post<SneakersType>("/createSneaker", params);

    return data;
  }
);

export const fetchDeleteSneaker = createAsyncThunk<string, string>(
  "deleteSneaker",
  async (id) => {
    await axios.delete(`/deleteSneaker/${id}`);

    return id;
  }
);

export const addSneakerToWish = createAsyncThunk<
  { message: any; user: any },
  { userId: any; sneakerId: any }
>("wishlist/addSneaker", async ({ userId, sneakerId }) => {
  const { data } = await axios.post(`/addSneakerToWish/${userId}/${sneakerId}`);
  return data;
});

export const addSneakerToCart = createAsyncThunk<
  { message: any; user: any },
  { userId: any; sneakerId: any }
>("cart/addSneaker", async ({ userId, sneakerId }) => {
  const { data } = await axios.post(`/addSneakerToCart/${userId}/${sneakerId}`);
  return data;
});

export const fetchUserWish = createAsyncThunk(
  "user/fetchWish",
  async (userId: string) => {
    const { data } = await axios.get(`/getWish/${userId}`);

    return data.wish;
  }
);

export const fetchUserCart = createAsyncThunk(
  "user/fetchCart",
  async (userId: string) => {
    const { data } = await axios.get(`/getCart/${userId}`);

    return data.cart;
  }
);

export const deleteFromCart = createAsyncThunk<
  { message: any; user: AuthType },
  { id: any; sneakerId: any }
>("cart/removeSneaker", async ({ id, sneakerId }) => {
  const { data } = await axios.delete(`/deleteFromCart/${id}/${sneakerId}`);
  return data;
});


const initialState: SneakersSLiceState = {
  sneakers: {
    itemsSneakers: [],
    statusSneakers: Status.LOADING,
  },
  user: null,
  wish: [],
  cart: [],
};

const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.sneakers.itemsSneakers = [];
      state.sneakers.statusSneakers = Status.LOADING;
    }),
      builder.addCase(
        fetchSneakers.fulfilled,
        (state, action: PayloadAction<SneakersType[]>) => {
          state.sneakers.itemsSneakers = action.payload;
          state.sneakers.statusSneakers = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchSneakers.rejected, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.ERROR;
      }),
      builder.addCase(fetchOneSneaker.pending, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.LOADING;
      }),
      builder.addCase(
        fetchOneSneaker.fulfilled,
        (state, action: PayloadAction<SneakersType>) => {
          const index = state.sneakers.itemsSneakers.findIndex(
            (s) => s._id === action.payload._id
          );
          if (index !== -1) {
            state.sneakers.itemsSneakers[index] = action.payload;
          } else {
            state.sneakers.itemsSneakers.push(action.payload);
          }
          state.sneakers.statusSneakers = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchOneSneaker.rejected, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.ERROR;
      }),
      builder.addCase(fetchCreateSneaker.pending, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.LOADING;
      }),
      builder.addCase(
        fetchCreateSneaker.fulfilled,
        (state, action: PayloadAction<SneakersType[]>) => {
          state.sneakers.itemsSneakers = action.payload;
          state.sneakers.statusSneakers = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchCreateSneaker.rejected, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.ERROR;
      }),
      builder.addCase(fetchUpdateSneaker.pending, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.LOADING;
      }),
      builder.addCase(
        fetchUpdateSneaker.fulfilled,
        (state, action: PayloadAction<SneakersType>) => {
          const index = state.sneakers.itemsSneakers.findIndex(
            (s) => s._id === action.payload._id
          );
          if (index !== -1) {
            state.sneakers.itemsSneakers[index] = action.payload;
          }
          state.sneakers.statusSneakers = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchUpdateSneaker.rejected, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.ERROR;
      }),
      builder.addCase(fetchDeleteSneaker.pending, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.LOADING;
      }),
      builder.addCase(
        fetchDeleteSneaker.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.sneakers.itemsSneakers = state.sneakers.itemsSneakers.filter(
            (s) => s._id !== action.payload
          );
          state.sneakers.statusSneakers = Status.SUCCESS;
        }
      ),
      builder.addCase(fetchDeleteSneaker.rejected, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.ERROR;
      }),
      builder.addCase(addSneakerToWish.pending, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.LOADING;
      }),
      builder.addCase(addSneakerToWish.fulfilled, (state, action) => {
        // @ts-ignore
        state.user.wish = action.payload.user.wish;
      }),
      builder.addCase(addSneakerToWish.rejected, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.ERROR;
      }),
      builder.addCase(addSneakerToCart.pending, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.LOADING;
      }),
      builder.addCase(addSneakerToCart.fulfilled, (state, action) => {
        // @ts-ignore
        state.user.cart = action.payload.user.cart;
      }),
      builder.addCase(addSneakerToCart.rejected, (state) => {
        state.sneakers.itemsSneakers = [];
        state.sneakers.statusSneakers = Status.ERROR;
      }),
      builder
        .addCase(fetchUserWish.pending, (state) => {
          state.sneakers.itemsSneakers = [];
          state.sneakers.statusSneakers = Status.LOADING;
        })
        .addCase(fetchUserWish.fulfilled, (state, action) => {
          state.wish = action.payload;
        })
        .addCase(fetchUserWish.rejected, (state) => {
          state.sneakers.itemsSneakers = [];
          state.sneakers.statusSneakers = Status.ERROR;
        })
        .addCase(fetchUserCart.pending, (state) => {
          state.sneakers.itemsSneakers = [];
          state.sneakers.statusSneakers = Status.LOADING;
        })
        .addCase(fetchUserCart.fulfilled, (state, action) => {
          state.cart = action.payload;
        })
        .addCase(fetchUserCart.rejected, (state) => {
          state.sneakers.itemsSneakers = [];
          state.sneakers.statusSneakers = Status.ERROR;
        }),
      builder
        .addCase(deleteFromCart.pending, (state) => {
          state.sneakers.statusSneakers = Status.LOADING;
        })
        .addCase(deleteFromCart.fulfilled, (state, action) => {
          // @ts-ignore
          state.user.cart = action.payload.user.cart;
          state.sneakers.statusSneakers = Status.SUCCESS;
        })
        .addCase(deleteFromCart.rejected, (state) => {
          state.sneakers.statusSneakers = Status.ERROR;
        });
  },
});

export const selectSneakers = (state: RootState) => state.sneaker.sneakers;
export const selectCart = (state: RootState) => state.sneaker.cart;
export const selectWish = (state: RootState) => state.sneaker.wish;

export const sneakersReducer = sneakersSlice.reducer;
