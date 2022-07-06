/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowHandler from "../Profile/FollowHandler";
import { isEmpty } from "../Utils";

export default function Followers() {
  const userData = useSelector((state) => state.userReducer.user);
  const usersData = useSelector((state) => state.usersReducer.users);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isEmpty(usersData[0])) setIsLoading(false);
  }, [usersData]);

  return (
    <div className="followers-container">
      <h3>Followers</h3>
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <ul>
          {usersData.map((user) => {
            for (let i = 0; i < userData.followers.length; i++) {
              if (user._id === userData.followers[i]) {
                return (
                  <li key={user.id}>
                    <img src={user.picture} alt="user-pic" />
                    <h3>{user.username}</h3>
                    <FollowHandler idToFollow={user._id}/>
                  </li>
                );
              }
            }
          })}
        </ul>
      )}
    </div>
  );
}
