import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';   
import transactionsReducer from './transactions/slice'; 
 
 
export const store = configureStore({ 
  reducer: { 
    transactions: transactionsReducer,  
  }, 
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }), 
  devTools: process.env.NODE_ENV === 'development',
});
 
export const persistor = persistStore(store);