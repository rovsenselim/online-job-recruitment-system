// redux/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    user: null,
    isAuthenticated: false,
    role: null,
};

let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const payload = action.payload;
            state.user = {
                ...payload,
                id: payload.id || payload._id, // id problemi çözülür
            };
            state.isAuthenticated = true;
            state.role = payload.role;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.role = null;
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
