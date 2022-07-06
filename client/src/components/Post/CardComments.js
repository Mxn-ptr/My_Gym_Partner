import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import FollowHandler from "../Profile/FollowHandler";
import axios from "axios";
import { getPosts } from "../../feature/postsSlice";
import EditDeleteComment from "./EditDeleteComment";

export default function CardComments({ post }) {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer.users);
  const userData = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const data = {
    userId: userData._id,
    username: userData.username,
    text: text,
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (text) {
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/posts/comments/${post._id}`,
        data: data,
      })
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_API_URL}api/posts`)
            .then((res) => dispatch(getPosts(res.data)));
        })
        .then(() => setText(""));
    }
  };

  return (
    <>
      <h5>Comments</h5>
      <div className="comments-container">
        {post.comments.map((comment) => {
          return (
            <>
              <div className="comment-header">
                <div className="left-part">
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === comment.userId) return user.picture;
                          else return null;
                        })
                        .join("")
                    }
                    alt="poster-pic"
                    width="50px"
                    height="50px"
                  />
                    <h3 className="pseudo-card">{comment.username}</h3>
                    {comment.userId !== userData._id && (
                      <FollowHandler idToFollow={comment.userId} />
                    )}
                </div>
                <div className="right-part">
                  <span>{timestampParser(comment.timestamp)}</span>
                </div>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </>
          );
        })}
      </div>
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Post a comment"
          ></input>
          <button>Send</button>
        </form>
      )}
    </>
  );
}
