import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import themeReducer from '../features/theme/themeSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'],
}
const rootReducer = combineReducers({
  theme: themeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store)
