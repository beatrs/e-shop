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

const combinedReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})


const persistedReducer = persistReducer(persistConfig, combinedReducer)

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined
        storage.removeItem('persist:root')
    }
    return persistedReducer(state, action)
}
  

export const store = configureStore ({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)


