import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import { likePost, unlikePost } from "../../feature/postsSlice"

export default function Likes({ post }) {
  const [liked, setLiked ] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch()

  useEffect(() => {
    if (post.likes.includes(uid)) setLiked(true);
    else setLiked(false)
  }, [uid, post.likes, liked, setLiked]);

  const like = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/posts/like/${post._id}`,
      data: { idUser: uid }
    })
      .then(() => dispatch(likePost([post._id, uid])))
      .catch((err) => console.log(err))
    setLiked(true)
  }

  const unlike = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/posts/unlike/${post._id}`,
      data: { idUser: uid }
    })
      .then(() => dispatch(unlikePost([post._id, uid])))
      .catch((err) => console.log(err))
    setLiked(false)
  }


  return (
    <div className="likes-container">
      {liked === false && (
       <i onClick={like} className="fa-regular fa-heart"></i>
      )}
      {liked === true && (
        <i onClick={unlike} className="fa-solid fa-heart"></i>
      )}
    </div>
  )
}
