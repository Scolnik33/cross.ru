import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { AuthType } from "../../types/AuthType";
import { RootState } from "../store";
import { FormLoginValues, FormRegisterValues } from "../../types/FormType";

export const fetchUserRegister = createAsyncThunk<AuthType, FormRegisterValues>('auth/fetchUserRegister', async (params) => {
    const { data } = await axios.post<AuthType>('/register', params);

    return data;
})

export const fetchUserLogin = createAsyncThunk<AuthType, FormLoginValues>('auth/fetchUserLogin', async (params) => {
    const { data } = await axios.post<AuthType>('/login', params);

    return data;
})

export const fetchGetMe = createAsyncThunk('auth/fetchGetMe', async () => {
    const { data } = await axios.get<AuthType>('/getme');

    return data as AuthType;
})

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface AuthSliceState {
    data: AuthType | null,
    status: Status
}

const initialState: AuthSliceState = {
    data: null,
    status: Status.LOADING
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserRegister.pending, (state) => {
            state.data = null,
            state.status = Status.LOADING;
        }),
        builder.addCase(fetchUserRegister.fulfilled, (state, action: PayloadAction<AuthType>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        }),
        builder.addCase(fetchUserRegister.rejected, (state) => {
            state.data = null,
            state.status = Status.ERROR;
        }),
        builder.addCase(fetchUserLogin.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING;
        }),
        builder.addCase(fetchUserLogin.fulfilled, (state, action: PayloadAction<AuthType>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        }),
        builder.addCase(fetchUserLogin.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        }),
        builder.addCase(fetchGetMe.pending, (state) => {
            state.data = null;
            state.status = Status.LOADING;
        }),
        builder.addCase(fetchGetMe.fulfilled, (state, action: PayloadAction<AuthType>) => {
            state.data = action.payload;
            state.status = Status.SUCCESS;
        }),
        builder.addCase(fetchGetMe.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        })
    }
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const authData = (state: RootState) => state.auth.data;
export const userStatus = (state: RootState) => state.auth.status;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;