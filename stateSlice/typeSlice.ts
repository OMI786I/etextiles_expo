import { createSlice } from "@reduxjs/toolkit";

const typeSlice = createSlice({
  name: "types",
  initialState: "All",
  reducers: {
    updateTypes: (state, action) => action.payload,
  },
});
export const { updateTypes } = typeSlice.actions;

export default typeSlice.reducer;
