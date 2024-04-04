import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { IRegistrationUser } from "../../types/types";
import {instance} from "../../api/axios.ts";

interface IInitialState {
    isAuth: boolean,
    user: IRegistrationUser,
    isLoading: boolean,
    error: string | null,
}


export const checkUser = createAsyncThunk('user/setUser',
    async() => {
        try {
            const {data} = await instance.get('/user/profile');
            return data

        } catch (e) {
            throw new Error('Ошибка получения профиля');
        }
    })

const initialState: IInitialState = {
    isAuth: false,
    user: {
        id: '',
        email: '',
        name: '',
        password: '',
        surname: '',
        city: '',
        role: '',
        image: '',
    },
    error: null,
    isLoading: false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },

        setUser: (state, action: PayloadAction<IRegistrationUser>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        resetUser: (state) => {
            state.user = {
                id: '',
                email: '',
                name: '',
                password: '',
                surname: '',
                city: '',
                role: '',
                image: '',
            }

            state.isAuth = false;
        }
    },

    extraReducers: builder => {
        builder.addCase(checkUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }),
        builder.addCase(checkUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;

            if(!action.payload.hasOwnProperty('response')) {
                state.user = action.payload;
                state.isAuth = true;
            }
        }),
        builder.addCase(checkUser.rejected, (state, action) => {
            state.isLoading = false;
            if (action.error) {
                state.error = action.error.message || 'Unknown error';
            } else {
                state.error = 'Unknown error';
            }
        })
    }
})


export const {resetUser, setAuth, setUser} = userSlice.actions;
export default userSlice.reducer;