import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name : "users",
  initialState: {
    users: "",
  },
  reducers : {
    getAllUsers: (state, {payload}) => {
      state.users = payload
    }
  }
})

export const { getAllUsers } = usersSlice.actions;
export default usersSlice.reducer;

