import { Button, Stack, Typography } from '@mui/material';
import React from 'react'
import Textbox from '../../components/Textbox';
import { PersonAddAlt1 } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Register() {
    const form = useForm();
    const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  
  const submitHandler = handleSubmit(async(data) => {
    console.log(data);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        data
      );
      console.log(res); 

    } catch (error) {
      console.log(error.response)
    }
  })
  return (
    <>
      <Stack direction={"column"} gap={3} component={"form"} onSubmit={submitHandler}>
        <Typography
          variant="h4"
          fontSize={19}
          fontWeight={500}
          letterSpacing={2}
        >
          register
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
        <Textbox
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

export default Register