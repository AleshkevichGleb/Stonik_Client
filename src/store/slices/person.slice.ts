import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPersonData, TPersonDataField} from "../../types/types.ts";

interface IInitialState {
    person: IPersonData,
}

interface ISetPersonValuePayload {
    field: keyof IPersonData;
    value: IPersonData[keyof IPersonData];
}

const initialState: IInitialState = {
    person: {
        name: '',
        phone: '',
        email: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        payment: {
            type: 'card',
            surrender_of_money: '',
            cvc: '',
            expiry: '',
            name: '',
            number: '',
        },
        agreement: false,
    }
}


const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setPerson: (state, action: PayloadAction<{id: TPersonDataField, value: string, checked: boolean, name: string }>) => {
            const {id, value, checked, name} = action.payload;
            const setValue = id === 'agreement' ? checked : value;
            if(id === 'payment') {
                let newValue = value;
                switch (name) {
                    case "number": {
                        newValue = newValue.replace(/\s/g, '');
                        newValue = newValue.replace(/(.{4})/g, '$1 ');
                        newValue = newValue.trim();
                        break
                    }
                    case "expiry": {
                        newValue = newValue.replace(/\s|\//g, '');
                        newValue = newValue.replace(/(.{2})(.{2})/g, '$1/$2 ');
                        newValue = newValue.trim();
                        break
                    }
                }
                state.person[id] = {...state.person[id], [name]: newValue}
            } else if(name === 'payment') {
                // if(id !== 'surrender_of_money' && state[name].hasOwnProperty("surrender_of_money")) delete state[name].surrender_of_money;
                state.person[name] = {...state.person[name], [id]: setValue}
            } else {
                (state.person[id] as any) = setValue;
            }
        },

        setPersonValue:(state, action:PayloadAction<ISetPersonValuePayload>) => {
            const { field, value } = action.payload;
            (state.person[field] as any) = value;
        },

        check_person_data: (state) => {
            if (state.person.payment && state.person.payment.type !== 'cash' && state.person.payment.hasOwnProperty("surrender_of_money")) {
                state.person.payment.surrender_of_money = '';
            }
        },

    },
})

export const { setPerson, check_person_data, setPersonValue } = personSlice.actions;
export default personSlice.reducer;