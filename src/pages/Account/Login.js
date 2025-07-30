import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import TextB from '../../components/TextBox/TextB';
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/auth_redux/authAction';
import './account.css'

function Login(props) {
  const navigate = useNavigate(); 
      const form = useForm();
      const { register, handleSubmit, formState } = form;
    const defaultSnack = {
      show: false,
      message: "",
      type: "",
    };
  const [snack, setSnack] = useState(defaultSnack);
  const dispatch = useDispatch(); 
  const submitHandler = handleSubmit(async (data) => {
        
        try {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
              data
            );
          console.log(response.data);
          
          if (response.data.success) {
            // we have logged in successfully
            setSnack({ show: true, message: response.data.msg, type: "success" });

            if (window) {
              
              window.localStorage.setItem('token', response.data.token); 
              window.localStorage.setItem('username', response.data.credentials.username);
              dispatch(loginUser(response.data.credentials.username));
              setTimeout(() => {
                navigate('/');
              }, 3000);
            }
          }
          else {
            setSnack({
              show: true,
              message: response.data.msg,
              type: "error",
            });
            console.log(response.data.msg); 
          }
        } catch (error) {
          console.log(error.response)
          setSnack({ show: true, message: error.response.data.msg, type: "error" });
        }

      });
  return (
    <>
      <Snackbar
        open={snack.show}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={1500}
        onClose={() => setSnack(defaultSnack)}
      >
        <Alert severity={snack.type} sx={{ fontSize: "1.1rem", width:"100%"}}>{snack.message}</Alert>
      </Snackbar>
      <Stack
        direction={"column"}
        component={"form"}
        gap={3}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <Typography
          variant="h3"
          fontSize={23}
          fontWeight={500}
          letterSpacing={2}
        >
          login
        </Typography>

        <TextB
          placeholder="username"
          name={"username"}
          required={true}
          register={register}
          msg={"Please enter valid username"}
        />
        <TextB
          placeholder="password"
          type="password"
          name={"password"}
          required={true}
          register={register}
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