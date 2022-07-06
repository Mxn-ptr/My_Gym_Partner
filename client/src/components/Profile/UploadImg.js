import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePicture } from "../../feature/userSlice";

export default function UploadImg() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", userData.username);
    data.append("userId", userData._id);
    data.append("file", file);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/users/upload`, data)
      .then((res) => dispatch(updatePicture(res.data.picture)))
      .catch((err) => console.log(err));
  };

  let input = document.getElementById("file");
  let imageName = document.getElementById("imageName");

  if (input) {
    input.addEventListener("change", () => {
      let inputImage = document.querySelector("input[type=file]").files[0];

      imageName.innerText = inputImage.name;
    });
  }

  return (
    <form action="" className="upload-form" onSubmit={handlePicture}>
      <div className="upload-img">
        <label htmlFor="file">
          Select Image <br />
          <i className="fa fa-2x fa-camera"></i>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <span id="imageName"></span>
        </label>
      </div>
      <button>Modify your picture</button>
    </form>
  );
}
