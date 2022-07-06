import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../feature/postsSlice";

export default function DeleteCard(post) {
  const dispatch = useDispatch();

  const deletePost = () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/posts/${post.id}`
    })
      .then(() => dispatch(deleteCard(post.id)))
      .catch((err) => console.log(err));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this post ?")) {
          deletePost();
        }
      }}
    >
      <i className="fa-solid fa-trash-can" alt="trash"></i>
    </div>
  );
}
