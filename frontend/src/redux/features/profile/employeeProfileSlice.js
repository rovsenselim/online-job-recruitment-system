import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

// Async thunk - profil məlumatını gətir
export const fetchEmployeeProfile = createAsyncThunk(
    "employeeProfile/fetch",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token;
            const res = await API.get("/profile/employee/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Xəta baş verdi");
        }
    }
);

let employeeProfileSlice = createSlice({
    name: "employeeProfile",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEmployeeProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Xəta baş verdi";
            });
    },
});

export default employeeProfileSlice.reducer;
