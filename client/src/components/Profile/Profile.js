import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../feature/postsSlice";
import { updateUser } from "../../feature/userSlice";
import Navbar from "../Navbar/Navbar";
import Card from "../Post/Card";
import { dateParser, isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";
import UploadImg from "./UploadImg";

export default function Profile() {
  const userData = useSelector((state) => state.userReducer.user);
  const usersData = useSelector((state) => state.usersReducer.users);
  const postsData = useSelector((state) => state.postsReducer.posts);
  const dispatch = useDispatch();
  const [loadPosts, setLoadPosts] = useState(true);
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [bio, setBio] = useState();
  const [localisation, setLocalisation] = useState();
  const [type_of_sports, setTypeOfSports] = useState();
  const [frequence, setFrequence] = useState();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const [count, setCount] = useState(5);
  let array = [];

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

  const [updateForm, setUpdateForm] = useState(false);

  for (let i = 16; i < 100; i++) {
    array.push(i);
  }

  const data = {
    age,
    gender,
    bio,
    localisation,
    type_of_sports,
    frequence,
  };
  const handleUpdate = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}api/users/${userData._id}`, data)
      .then((res) => {
        dispatch(updateUser(data));
      })
      .catch((err) => console.log(err));
    setUpdateForm(false);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-head">
            <div className="profile-head-left">
              <img
                className="profile-picture"
                src={userData.picture}
                alt="User"
              />
              <h3>
                {userData.firstname} {userData.lastname}
              </h3>
            </div>
            <div className="profile-head-right">
              <UploadImg />
            </div>
          </div>
          <div className="button-profile">
            <button
              className="profile-footer-btn"
              onClick={() => setFollowingPopup(true)}
            >
              Subscriptions :{" "}
              {userData.following ? userData.following.length : "0"}
            </button>
            <button
              className="profile-footer-btn"
              onClick={() => setFollowersPopup(true)}
            >
              Subscribers :{" "}
              {userData.followers ? userData.followers.length : "0"}
            </button>
          </div>
          {followingPopup && (
            <div className="popup-container">
              <span onClick={() => setFollowingPopup(false)} className="cross">
                &#10005;
              </span>
              <br />
              <h4>Followings</h4>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.following.length; i++) {
                    if (user._id === userData.following[i]) {
                      return (
                        <li key={user.id}>
                          <img src={user.picture} alt="user-pic" />
                          <h3>{user.username}</h3>
                          <FollowHandler idToFollow={user._id} />
                        </li>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          )}
          {followersPopup && (
            <div className="popup-container">
              <span onClick={() => setFollowersPopup(false)} className="cross">
                &#10005;
              </span>
              <br />
              <h4>Followers</h4>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (user._id === userData.followers[i]) {
                      return (
                        <li key={user.id}>
                          <img src={user.picture} alt="user-pic" />
                          <h3>{user.username}</h3>
                          <FollowHandler idToFollow={user._id} />
                        </li>
                      );
                    }
                  }
                  return null;
                })}
              </ul>
            </div>
          )}
          <div className="profile-username">
            <p>
              <b>Username:</b> {userData.username}
            </p>
            <p>
              <b>Name:</b> {userData.firstname} {userData.lastname}
            </p>
          </div>
          <h4>About</h4>
          {!updateForm && (
            <>
              <div className="about">
                <div className="about-left">
                  <p>
                    <b>Bio:</b> {userData.bio}
                  </p>
                  <p>
                    <b>Age:</b> {userData.age}
                  </p>
                  <p>
                    <b>Gender:</b> {userData.gender}
                  </p>
                </div>
                <div className="about-right">
                  <p>
                    <b>Location:</b> {userData.localisation}
                  </p>
                  <p>
                    <b>Type of sports:</b> {userData.type_of_sports}
                  </p>
                  <p>
                    <b>Frequence: </b> {userData.frequence}
                  </p>
                </div>
              </div>
              <button onClick={() => setUpdateForm(!updateForm)}>
                Modify your informations
              </button>
            </>
          )}
          {updateForm && (
            <>
              <div className="about">
                <div className="about-left">
                  <div className="information-form">
                    <p>
                      <b>Bio:</b>{" "}
                    </p>
                    <textarea
                      type="text"
                      defaultValue={userData.bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="information-form">
                    <p>
                      <b>Age:</b>{" "}
                    </p>
                    <select
                      name="age"
                      className="selector"
                      onChange={(e) => setAge(e.target.value)}
                    >
                      <option value="Not known">- Select -</option>
                      {array.map((number, index) => (
                        <option value={number}>{number}</option>
                      ))}
                    </select>
                  </div>
                  <div className="information-form">
                    <p>
                      <b>Gender:</b>
                    </p>
                    <select
                      name="gender"
                      className="selector"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="Not known">- Select -</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="about-right">
                  <div className="information-form">
                    <p>
                      <b>Localisation:</b>{" "}
                    </p>
                    <textarea
                      type="text"
                      defaultValue={userData.localisation}
                      onChange={(e) => setLocalisation(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="information-form">
                    <p>
                      <b>Type of sports:</b>{" "}
                    </p>
                    <select
                      name="type_of_sports"
                      className="selector"
                      onChange={(e) => setTypeOfSports(e.target.value)}
                    >
                      <option value="Not known">- Select -</option>
                      <option value="Bodybuilding">Bodybuidling</option>
                      <option value="Crossfit">Crossfit</option>
                      <option value="Calisthenics">Calisthenics</option>
                    </select>
                  </div>
                  <div className="information-form">
                    <p>
                      <b>Frequence:</b>{" "}
                    </p>
                    <select
                      name="frequence"
                      className="selector"
                      onChange={(e) => setFrequence(e.target.value)}
                    >
                      <option value="Not known">- Select -</option>
                      <option value="1 or 2 training/week">
                        1 or 2 training/week
                      </option>
                      <option value="3 or 4 training/week">
                        3 or 4 training/week
                      </option>
                      <option value="5 to 7 training/week">
                        5 to 7 training/week
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={handleUpdate}>Validate the informations</button>
            </>
          )}
          <h6>Member since : {dateParser(userData.createdAt)}</h6>
        </div>
        <div className="profile-right">
          <h3>Your posts</h3>
          <ul>
            {!isEmpty(postsData[0]) &&
              postsData.map((post) => {
                if (post.creator === userData._id) {
                  return <Card post={post} key={post._id} />;
                } else return null;
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
