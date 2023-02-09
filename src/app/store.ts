import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import habitsSlice from './habitsSlice/habitsSlice';
import themeSlice from './themeSlice/themeSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  habits: habitsSlice,
  theme: themeSlice,
});

const persistedHabits = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedHabits,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        serializableCheck: false,
      },
    }),
});

export let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
