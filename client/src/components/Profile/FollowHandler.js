import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../feature/userSlice";
import { isEmpty } from "../Utils";

export default function FollowHandler({ idToFollow }) {
  const idToUnfollow = idToFollow;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/users/follow/${userData._id}`,
      data: { idToFollow },
    })
      .then(() => dispatch(follow(idToFollow)))
      .catch((err) => console.log(err));
    setIsFollow(true);
  };

  const handleUnfollow = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/users/unfollow/${userData._id}`,
      data: { idToUnfollow },
    })
      .then(() => dispatch(unfollow(idToUnfollow)))
      .catch((err) => console.log(err));
    setIsFollow(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollow(true);
      } else setIsFollow(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
        {isFollow && <button onClick={handleUnfollow}>Followed</button>}
        {!isFollow && <button onClick={handleFollow}>Follow</button>}
    </>
  );
}
