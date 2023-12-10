import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import signupReducer from '../features/login/signupSlice';
import categoryReducer from '../features/categorySlice';
import artisanProfileReducer from '../features/addArtisanSlice';
import statesReducer from '../features/stateSlice';
import artisansReducer from '.././pages/SearchArtisanSlice';
import artisanReducer from '.././pages/artisanDetailSlice';
import customerReducer from '.././pages/profileSlice';
import citiesReducer from '../features/citySlice';
import streetsReducer from '../features/streetSlice';
import houseNumberReducer from '../features/houseNumberSlice';

export const store = configureStore({
  reducer: {
    users: loginReducer,
    signup: signupReducer,
    category: categoryReducer,
    artisanProfile: artisanProfileReducer,
    artisans: artisansReducer,
    states: statesReducer,
    cities: citiesReducer,
    streets: streetsReducer,
    address: houseNumberReducer,
    artisan: artisanReducer,
    customer: customerReducer,
  },
});
