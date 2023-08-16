import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { integrationsApiSlice } from '../features/integrations/integrations-api-slice'
import themeReducer from '../features/theme/themeSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'],
}
const rootReducer = combineReducers({
  theme: themeReducer,
  [integrationsApiSlice.reducerPath]: integrationsApiSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(integrationsApiSlice.middleware),
})

export const persistor = persistStore(store)
