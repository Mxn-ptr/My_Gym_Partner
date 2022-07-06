import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { Link } from "react-router-dom";
import { getPosts } from "../../feature/postsSlice";

export default function NewPost() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);
  
  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append('creator', userData._id);
      data.append('message', message);
      if (file) data.append('file', file);
      
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        data: data,
      })
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
      })
        .then((res) => dispatch(getPosts(res.data)))
        .then(() => cancelPost())

    } else {
      alert("Please, enter something")
    }
  };
  
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0]);
  };


  const cancelPost = () => {
    setMessage("");
    setPostPicture("")
    setFile("");
  };

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <Link to="/profile">
            <div className="user-info">
              <img
                className="post-pic"
                src={userData.picture}
                alt="user-pic"
                width="50px"
                height="50px"
              />
            </div>
          </Link>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Share something !"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <div className="footer-form">
                <input
                  type="file"
                  id="fileupload"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              <div className="btn-send">
                {message || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>Cancel</button>
                  ) : null}
                <button className="send" onClick={handlePost}>Send</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
