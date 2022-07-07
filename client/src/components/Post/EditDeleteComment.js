import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../feature/postsSlice";
import { UidContext } from "../AppContext";

export default function EditDeleteComment({ comment, postId }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const data = {
    commentId: comment._id,
    text: text,
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/edit-comment/${postId}`,
        data: data,
      })
        .then(() => dispatch(editComment([postId, comment._id, text])))
        .catch((err) => console.log(err));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/posts/delete-comment/${postId}`,
      data: data
    })
      .then(() => dispatch(deleteComment([postId, comment._id])))
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.creator, comment.userId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <>
          <span onClick={() => setEdit(!edit)}>
            <i className="fas fa-edit"></i>
          </span>
          <span
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this comment ?")
              ) {
                handleDelete();
              }
            }}
          >
            <i className="fa-solid fa-trash-can" alt="trash"></i>
          </span>
        </>
      )}
      {isAuthor && edit && (
        <>
          <span onClick={() => setEdit(!edit)}>
            <i className="fas fa-edit"></i>
          </span>
          <form action="" onSubmit={handleEdit} className="edit-comment-form">
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.text}
            />
            <button>Modify</button>
          </form>
        </>
      )}
    </div>
  );
}
