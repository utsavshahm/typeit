import { Button, Stack, Typography } from '@mui/material';
import React from 'react'
import Textbox from '../../components/Textbox';
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login(props) {
      const form = useForm();
      const { register, handleSubmit, formState } = form;
      const { errors } = formState;
  const submitHandler = handleSubmit(async (data) => {
        
        try {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/users/login`,
              data
            );
            console.log(response.data);
        } catch (error) {
          console.log(error.response)
        }

      });
  return (
    <>
      <Stack direction={"column"} component={"form"} gap={3} onSubmit={submitHandler}>
        <Typography
          variant="h4"
          fontSize={19}
          fontWeight={500}
          letterSpacing={2}
        >
          login
        </Typography>

        <Textbox
          placeholder="username"
          name={"username"}
          required={true}
          register={register}
          errors={errors}
          msg={"Please enter valid username"}
        />
        <Textbox
          placeholder="email"
          type="email"
          name={"email"}
          required={true}
          register={register}
          errors={errors}
          msg={"Please enter valid email"}
        />
        <Textbox
          placeholder="password"
          type="password"
          name={"password"}
          required={true}
          register={register}
          errors={errors}
          msg={"Please enter your password!"}
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
          startIcon={<LoginIcon />}
        >
          Sign in
        </Button>
      </Stack>
    </>
  );
}

export default Login