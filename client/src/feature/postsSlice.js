import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: "",
  },
  reducers: {
    getPosts: (state, { payload }) => {
      state.posts = payload
    },
    likePost: (state, { payload }) => {
      state.posts.map((post, index) => {
        if (post._id === payload[0]) {
          state.posts[index].likes.push(payload[1]);
          return 1;
        } else return null;
      });
    },
    unlikePost: (state, { payload }) => {
      state.posts.map((post, index) => {
        if (post._id === payload[0]) {
          for (let i = 0; i < post.likes.length; i++) {
            if (state.posts[index].likes[i] === payload[1]) {
              state.posts[index].likes.splice(i, 1);
              return 1;
            }
          }
          return 1;
        } else return null;
      });
    },
    editPost: (state, { payload }) => {
      state.posts.map((post, index) => {
        if (post._id === payload[0]) {
          state.posts[index].message = payload[1];
          return 1;
        } else return null;
      });
    },
    deleteCard: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },
    editComment: (state, { payload }) => {
      state.posts.map((post) => {
        if (post._id === payload[0]) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === payload[1]) {
                comment.text = payload[2];
                return comment;
              } else return comment;
            }),
          };
        } else return post;
      });
    },
    deleteComment : (state, {payload}) => {
      state.posts.map((post) => {
        if (post._id === payload[0]) {
          post.comments = post.comments.filter((comment) => comment._id !== payload[1])
        } else return post;
        return 1
      });

    }
  },
});

export const {
  getPosts,
  likePost,
  unlikePost,
  editPost,
  deleteCard,
  editComment,
  deleteComment
} = postsSlice.actions;
export default postsSlice.reducer;
