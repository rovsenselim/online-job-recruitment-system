import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import employeeProfileReducer from "../features/profile/employeeProfileSlice";
import employerProfileReducer from "../features/profile/employerProfileSlice";
import favoritesReducer from "../features/favoritesSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userReducer,
    employeeProfile: employeeProfileReducer,
    employerProfile: employerProfileReducer,
    favorites: favoritesReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // yalnız user reducer persist olunur
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
