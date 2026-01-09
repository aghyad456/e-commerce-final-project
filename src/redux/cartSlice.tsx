import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { numOfCartItems: 0 },
    reducers: {
        updateNumOfCartItems: (state, action) => {
            state.numOfCartItems = action.payload
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const { updateNumOfCartItems } = cartSlice.actions;

