import { configureStore, combineReducers } from "@reduxjs/toolkit"
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"

// persistReducer

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
  

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})


export const resetReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        const { routing } = state
        state = { routing }
    }
    return rootReducer(state, action)
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore ({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)


