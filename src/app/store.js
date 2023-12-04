import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import signupReducer from '../features/login/signupSlice';
import categoryReducer from '../features/categorySlice';
import artisanProfileReducer from '../features/addArtisanSlice';
import artisanReducer from '.././pages/SearchArtisanSlice';

export const store = configureStore({
  reducer: {
    users: loginReducer,
    signup: signupReducer,
    category: categoryReducer,
    artisanProfile: artisanProfileReducer,
    artisan: artisanReducer,
  },
});
