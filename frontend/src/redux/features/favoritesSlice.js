import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const job = action.payload;
            const exists = state.favorites.find((fav) => fav._id === job._id);
            if (exists) {
                // Əgər varsa, favorites-dən çıxar
                state.favorites = state.favorites.filter((fav) => fav._id !== job._id);
            } else {
                // Əks halda əlavə et
                state.favorites.push(job);
            }
        },
        removeFavorite: (state, action) => {
            // action.payload burada jobId olmalıdır
            state.favorites = state.favorites.filter((fav) => fav._id !== action.payload);
        },
        clearFavorites: (state) => {
            // Bütün favoriteləri təmizləmək üçün (lazımdırsa)
            state.favorites = [];
        },
    },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
