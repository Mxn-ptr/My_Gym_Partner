import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

export default function SignUpForm() {
  const [formSubmit, SetFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [localisation, setLocalisation] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username-error");
    const firstnameError = document.querySelector(".firstname-error");
    const lastnameError = document.querySelector(".lastname-error");
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    const passwordControlError = document.querySelector(
      ".passwordcontrol-error"
    );
    const localisationError = document.querySelector(".localisation-error");

    passwordControlError.innerHTML = "";

    if (password !== controlPassword) {
      passwordControlError.innerHTML = "Passwords do not match";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/register`,
        data: {
          username,
          firstname,
          lastname,
          email,
          password,
          localisation,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            usernameError.innerHTML = res.data.errors.username;
            firstnameError.innerHTML = res.data.errors.firstname;
            lastnameError.innerHTML = res.data.errors.lastname;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
            localisationError.innerHTML = res.data.errors.localisation;
          } else {
            SetFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h3 className="success-form">Registration successful</h3>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <div className="register-form">
            <input
              type="text"
              name="username"
              placeholder="Your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <div className="username-error"></div>
            <input
              type="text"
              className="name"
              name="firstname"
              placeholder="First name"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />
            <div className="firstname-error"></div>
            <input
              type="text"
              className="name"
              name="lastname"
              placeholder="Last name"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
            <div className="lastname-error"></div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email-error"></div>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password-error"></div>
            <input
              type="password"
              name="verify_password"
              placeholder="Verify password"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="passwordcontrol-error"></div>
            <input
              type="localisation"
              name="localisation"
              placeholder="Your city"
              onChange={(e) => setLocalisation(e.target.value)}
              value={localisation}
            />
            <div className="localisation-error"></div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </>
  );
}
