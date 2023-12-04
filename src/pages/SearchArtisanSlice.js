import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchArtisan = createAsyncThunk('artisans', async (getArtisan) =>
  getArtisan(),
);

const getArtisan = createSlice({
  name: 'artisan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtisan.pending, (state) => {
        state.status = 'loading';
        state.data = [];
        state.error = null;
      })
      .addCase(fetchArtisan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchArtisan.rejected, (state, action) => {
        state.status = 'failed';
        state.data = [];
        state.error = action.error.message;
      });
  },
});

// const getOneArtisan = createSlice({
//   name: 'artisan',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchArtisan.pending, (state) => {
//         state.status = 'loading';
//         state.data = [];
//         state.error = null;
//       })
//       .addCase(fetchArtisan.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.error = null;
//         state.data = action.payload;
//       })
//       .addCase(fetchArtisan.rejected, (state, action) => {
//         state.status = 'failed';
//         state.data = [];
//         state.error = action.error.message;
//       });
//   },
// });

export default getArtisan.reducer;
