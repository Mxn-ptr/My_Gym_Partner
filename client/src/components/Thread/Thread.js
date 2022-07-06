import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../feature/postsSlice";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import Card from "../Post/Card";
import { isEmpty } from "../Utils";

export default function Thread() {
  const [count, setCount] = useState(5);
  const [loadPosts, setLoadPosts] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsReducer.posts);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  useEffect(() => {
    if (loadPosts) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/posts`)
        .then((res) => dispatch(getPosts(res.data.slice(0, count))))
        .catch((err) => console.log(err));
      setLoadPosts(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPosts, dispatch, count]);

  return (
    <div className="div-body-container">

      <div className="thread-left">
        <Following/>
      </div>
      <div className="thread-container">
        <ul>
          {!isEmpty(posts[0]) &&
            posts.map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        </ul>
      </div>
      <div className="thread-right">
        <Followers/>
      </div>
    </div>
  );
}
