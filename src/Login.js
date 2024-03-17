import React from 'react';
import Navbar from './Navbar';
import { Button, Stack, TextField, Typography, styled } from '@mui/material';
import { Form } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {useForm} from 'react-hook-form';
import LoginIcon from '@mui/icons-material/Login';
import Textbox from './Textbox';


function Login() {

    const form = useForm();
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;

  return (
    <div>
        <Navbar/>

        <Stack justifyContent={'center'} alignItems={'center'}>
            <Stack direction={'row'} width={'55vw'} justifyContent={'space-between'}>
                <Stack direction={'column'} gap={3} component={'form'}>
                    <Typography variant='h4' fontSize={19} fontWeight={500} letterSpacing={2}>register</Typography>


                    <Textbox placeholder='username' name={'username'} required={true} register={register} errors={errors} msg={"Please enter valid username"}/>
                    <Textbox placeholder='email' type='email' name={'email'} required={true} register={register} errors={errors} msg={"Please enter valid email"}/>
                    <Textbox placeholder='password' type='password' name={'password'} required={true} register={register} errors={errors} msg={"Please enter your password!"} />
                    <Textbox placeholder='confirm password' type='password' name={'cnf-password'} required={true} register={register} errors={errors} msg={"Please confirm entered password!"}/>

                    
                    <Button variant='outlined' sx={{color:'white', borderColor:'#ccc', borderRadius:'10px', '&:hover':{borderColor:'white'}, fontFamily:'Poppins', fontSize:'19px'}} type='submit' startIcon={<PersonAddAlt1Icon/>}>Sign up</Button>


                </Stack>

                <Stack direction={'column'} component={'form'}  gap={3} >
                    <Typography variant='h4' fontSize={19} fontWeight={500} letterSpacing={2}>login</Typography>
                    
                    <Textbox placeholder='username' name={'username'} required={true} register={register} errors={errors} msg={"Please enter valid username"}/>
                    <Textbox placeholder='email' type='email' name={'email'} required={true} register={register} errors={errors} msg={"Please enter valid email"}/>
                    <Textbox placeholder='password' type='password' name={'password'} required={true} register={register} errors={errors} msg={"Please enter your password!"} />

                    
                    <Button variant='outlined' sx={{color:'white', borderColor:'#ccc', borderRadius:'10px', '&:hover':{borderColor:'white'}, fontFamily:'Poppins', fontSize:'19px'}} type='submit' startIcon={<LoginIcon/>}>Sign in</Button>

                </Stack>
            </Stack>

        </Stack>
    </div>
  );
}

export default Login;
