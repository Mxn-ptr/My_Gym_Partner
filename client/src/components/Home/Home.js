import React from "react";
import Navbar from "../Navbar/Navbar";
import NewPost from "../Post/NewPost";
import Thread from "../Thread/Thread";

export default function Home() {
  return (
    <>
      <Navbar />
      <NewPost />
      <Thread />
    </>
  );
}
