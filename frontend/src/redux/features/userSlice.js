import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    role: null,
};

let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const { user, token } = action.payload;

            state.user = {
                ...user,
                id: user.id || user._id,
                fullname: user.fullname || user.name || "",
            };

            state.token = token;
            state.role = user.role;
            state.isAuthenticated = true;
        },

        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.role = null;
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
