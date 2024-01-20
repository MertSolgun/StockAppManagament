import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  purchases: [],
  brands: [],
  categories: [],
  sales: [],
  products: [],
  loading: false,
  error: false,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getStocksSuccess: (state, { payload }) => {
      state[payload.url] = payload.apiData;
      state.loading = false;
      state.error = false;
    },
    getProPurSucces: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.purchases = payload[1];
      state.brands = payload[2];
      state.firms = payload[3];
    },
  },
});

export const { fetchFail, fetchStart, getStocksSuccess, getProPurSucces } =
  stockSlice.actions;

export default stockSlice.reducer;
