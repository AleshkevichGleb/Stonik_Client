import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRegistrationUser } from "../../types/types";

interface IInitialState {
    isAuth: boolean,
    user: IRegistrationUser,
}

const initialState: IInitialState = {
    isAuth: false,
    user: {
        email: '',
        name: '',
        password: '',
        phone: '',
        surname: '',
        city: '',
        role: ''
    }
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
        },
        resetUser: (state) => {
            state.user = {
                email: '',
                name: '',
                password: '',
                phone: '',
                surname: '',
                city: '',
                role: '',
            }
        }
    }
})


export const {resetUser, setAuth, setUser} = userSlice.actions;
export default userSlice.reducer;