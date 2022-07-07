import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import { UidContext } from "./components/AppContext";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Register from "./components/Register/Register";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserdata } from "./feature/userSlice";
import { getAllUsers } from "./feature/usersSlice";
import ProfileUser from "./components/Profile/ProfileUser";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
      .then((res) => {
        setUid(res.data)})
        .catch((err) => console.log("No token"))
        
    };
    fetchToken()
    if (uid) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/users/${uid}`)
        .then((res) => dispatch(getUserdata(res.data)))
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}api/users`)
      .then((res) => dispatch(getAllUsers(res.data)))
  })

  return (
    <UidContext.Provider value={uid}>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileuser" element={<ProfileUser />} />
      </Routes>
    </UidContext.Provider>
  );
}


export default App;
