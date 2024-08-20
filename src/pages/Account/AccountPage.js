import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Stack } from "@mui/material";
import Register from "./Register";
import Login from "./Login";

import './account.css'
import Footer from "../../components/Footer/Footer";

function AccountPage() {

  const signText = [{
    text: "Don't have an account?", 
    type : "Sign Up"
  },
    {
      text: "Already have an account?",
      type : "Sign In"
  }
  ]
  const [signIn, setSignIn] = useState(0);
  const [textState, setTextState] = useState(signText[0]);

  const changeForm = () => {
    
    if (signIn === 0) {
      setSignIn(1);
      setTextState(signText[1]);
    }
    else {
      setSignIn(0);
      setTextState(signText[0]);
    }
  }
  return (
    <div>
      <Navbar />

      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        // border={"1px solid red"}
        height={"70vh"}
      >
        {signIn===0 ? <Login/> : <Register/>}
        {/* <Login /> */}
        <p variant="body1" className="sign-up-span">
          {textState.text}
          <span className="sign-up" onClick={changeForm}>{textState.type}</span>
        </p>
      </Stack>

      <Footer/>
    </div>
  );
}

export default AccountPage;
