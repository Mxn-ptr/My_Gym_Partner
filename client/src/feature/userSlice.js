import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    getUserdata: (state, { payload }) => {
      state.user = payload;
    },
    updatePicture: (state, { payload }) => {
      state.user.picture = payload;
    },
    updateUser: (state, { payload }) => {
      const element = [
        "age",
        "bio",
        "gender",
        "localisation",
        "type_of_sports",
        "frequence",
      ];
      element.forEach((el) => {
        if (payload[el] !== undefined) state.user[el] = payload[el];
      });
    },
    follow: (state, { payload }) => {
      state.user.following.push(payload);
    },
    unfollow: (state, { payload }) => {
      for (let i = 0; i < state.user.following.length; i++) {
        if (state.user.following[i] === payload) {
          state.user.following.splice(i, 1);
          break;
        }
      }
    },
  },
});

export const { getUserdata, updatePicture, updateUser, follow, unfollow } =
  userSlice.actions;
export default userSlice.reducer;
