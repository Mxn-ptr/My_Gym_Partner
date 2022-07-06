/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../feature/postsSlice";
import FollowHandler from "../Profile/FollowHandler";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import Likes from "./Likes";

export default function Card({ post }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer.users);
  const userData = useSelector((state) => state.userReducer.user);

  const data = {
    message: textUpdate,
  };
  const updatePost = () => {
    if (textUpdate) {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
        data: data,
      })
        .then(() => dispatch(editPost([post._id, textUpdate])))
        .catch((err) => console.log(err));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="card-header">
            <div className="card-left">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.creator) return user.picture;
                    })
                    .join("")
                }
                alt="poster-pic"
                width="50px"
                height="50px"
              />
              <div className="username">
                <h3 className="pseudo-card">
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.creator) return user.username;
                    })}
                </h3>
              </div>
              {post.creator !== userData._id && (
                <FollowHandler idToFollow={post.creator} />
              )}
            </div>
            <span>{dateParser(post.createdAt)}</span>
          </div>
          <div className="card-right">
            <div className="card-text">
              {!isUpdated && <p>{post.message}</p>}
              {post.picture && <img src={post.picture} alt="post-pic" />}
            </div>
            <div className="updated-post">
              {isUpdated && (
                <>
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-container">
                    <button onClick={updatePost}>Update</button>
                  </div>
                </>
              )}
              {userData._id === post.creator && (
                <>
                  <i
                    onClick={() => setIsUpdated(!isUpdated)}
                    className="fas fa-edit"
                  ></i>
                  <DeleteCard id={post._id} />
                </>
              )}
            </div>
            <div className="card-footer">
              <Likes post={post} />
              <span>{post.likes.length}</span>
              <div className="comment-icon">
                <i
                  onClick={() => setShowComments(!showComments)}
                  className="fa-solid fa-comment"
                ></i>
              </div>
              <span>{post.comments.length}</span>
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
}
