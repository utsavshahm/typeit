import React from "react";
import Navbar from "../../components/Navbar";
import { Stack } from "@mui/material";
import Register from "./Register";
import Login from "./Login";

function AccountPage() {
  return (
    <div>
      <Navbar />

      <Stack justifyContent={"center"} alignItems={"center"}>
        <Stack
          direction={"row"}
          width={"55vw"}
          justifyContent={"space-between"}
        >
          <Register />
          <Login />
        </Stack>
      </Stack>
    </div>
  );
}

export default AccountPage;
