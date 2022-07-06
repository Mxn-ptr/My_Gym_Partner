import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feature/userSlice'
import usersReducer from '../feature/usersSlice'
import postsReducer from "../feature/postsSlice";


export default configureStore({
  reducer: {
    userReducer: userReducer,
    usersReducer: usersReducer,
    postsReducer: postsReducer,
  }
})
