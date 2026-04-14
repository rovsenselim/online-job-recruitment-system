import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import employeeProfileReducer from "../features/profile/employeeProfileSlice";
import employerProfileReducer from "../features/profile/employerProfileSlice";
import favoritesReducer from "../features/favoritesSlice";
import employerCvReducer from "../features/employerCvSlice";  // <-- yeni slice əlavə olundu

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
    employerCv: employerCvReducer,  // <-- yeni slice buraya əlavə edildi
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // Yalnız user slice localStorage-da qalacaq
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // redux-persist əməliyyatlarını serializable yoxlanışından istisna et
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
