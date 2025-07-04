import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const fetchEmployerProfile = createAsyncThunk(
    "employerProfile/fetch",
    async (userId, { rejectWithValue }) => {
        try {
            let res = await API.get(`/profile/employer/${userId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Xəta baş verdi");
        }
    }
);

let employerProfileSlice = createSlice({
    name: "employerProfile",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEmployerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default employerProfileSlice.reducer;
