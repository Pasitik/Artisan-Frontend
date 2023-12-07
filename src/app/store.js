import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import signupReducer from '../features/login/signupSlice';
import categoryReducer from '../features/categorySlice';
import artisanProfileReducer from '../features/addArtisanSlice';
import artisanReducer from '.././pages/SearchArtisanSlice';
import statesReducer from '../features/stateSlice';
import citiesReducer from '../features/citySlice';
import streetsReducer from '../features/streetSlice';

export const store = configureStore({
  reducer: {
    users: loginReducer,
    signup: signupReducer,
    category: categoryReducer,
    artisanProfile: artisanProfileReducer,
    artisan: artisanReducer,
    states: statesReducer,
    cities: citiesReducer,
    streets: streetsReducer,
  },
});
