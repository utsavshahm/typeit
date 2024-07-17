import { Alert, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import TextB from "../../components/TextBox/TextB";
import { PersonAddAlt1 } from "@mui/icons-material";
import { Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";

function Register() {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const defaultSnack = {
    show: false,
    message: "",
    type: ""
  };
  const [snack, setSnack] = useState(defaultSnack);

  const submitHandler = handleSubmit(async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
        data
      );
      console.log(res);
      if (res.data.success) {
        setSnack({ show: true, message: res.data.msg, type: "success" });
      }
      
    } catch (error) {
      console.log(error.response);
      setSnack({ show: true, message: error.response.data.msg, type: "error" });
    }
  });
  return (
    <>
      <Stack
        direction={"column"}
        gap={3}
        component={"form"}
        onSubmit={submitHandler}
      >
        <Snackbar
          open={snack.show}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={1500}
          onClose={() => setSnack(defaultSnack)}
          
        >
          <Alert severity={snack.type} sx={{width : "100%", fontSize : "1.1rem"}}>{snack.message}</Alert>
        </Snackbar>

        <Typography
          variant="h4"
          fontSize={23}
          fontWeight={500}
          letterSpacing={2}
        >
          register
        </Typography>

        <TextB
          placeholder="username"
          name={"username"}
          required={true}
          register={register}
          errors={errors}
          msg={"Please enter valid username"}
        />
        <TextB
          placeholder="password"
          type="password"
          name={"password"}
          required={true}
          register={register}
          errors={errors}
          msg={"Please enter your password!"}
        />
        <TextB
          placeholder="confirm password"
          type="password"
          name={"cnfPassword"}
          required={true}
          register={register}
          errors={errors}
          msg={"Please confirm entered password!"}
        />

        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "#ccc",
            borderRadius: "10px",
            "&:hover": { borderColor: "white" },
            fontFamily: "Poppins",
            fontSize: "19px",
          }}
          type="submit"
          startIcon={<PersonAddAlt1 />}
        >
          Sign up
        </Button>
      </Stack>
    </>
  );
}

export default Register;
