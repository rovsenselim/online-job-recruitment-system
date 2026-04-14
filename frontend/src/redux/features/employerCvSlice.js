// redux/features/profile/employerCvSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔹 CV-ləri serverdən çəkmək üçün thunk
export const fetchEmployeeCVs = createAsyncThunk(
    "employerCv/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/profile/employer/cvs/all", { withCredentials: true });
            return res.data.cvs;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Xəta baş verdi");
        }
    }
);

// 🔹 Slice
const employerCvSlice = createSlice({
    name: "employerCv",
    initialState: {
        cvs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeCVs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeCVs.fulfilled, (state, action) => {
                state.loading = false;
                state.cvs = action.payload;
            })
            .addCase(fetchEmployeeCVs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default employerCvSlice.reducer;
