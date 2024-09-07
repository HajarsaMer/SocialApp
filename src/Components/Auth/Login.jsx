import { AccountCircle, Lock } from '@mui/icons-material'
import { Button, InputAdornment, Stack, TextField } from '@mui/material'

import React, { useContext, useEffect, useState } from 'react'
import login from '../../assets/login.svg'
import Aos from 'aos';
import { darkmode } from '../../Context/darkContext';
import FacebookLogin from 'react-facebook-login';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Context/auth';



export default function Login() {
  let [email, setEmail] = useState('')
  let [err,setErr] = useState('')
  let navigate = useNavigate()
  let {setToken,setUser} = useContext(auth)
  async function handleLogin(values) {
    if (email)
      values.email = email
    try {
      let { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', values)
      if (data.message == 'success') {
        navigate('/')
        localStorage.setItem('userToken',data.token)
        setToken(data.token)
        setUser(data.token)
        setErr('')
      }
    } catch (error) {
       setErr(error.message)
      
    }
  }



  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleLogin
  })

  let { dark } = useContext(darkmode)

  useEffect(() => {
    Aos.init()
  }, [])

  const responseFacebook = (response) => {
    console.log(response);

    setEmail(response.email);
  }
  function componentClicked() {
    console.warn('data')
  }

  return (
    <div className='w-2/3 mx-auto' data-aos="fade-up" data-aos-id="super-duper">

      <div className="flex items-center  ">
        <div className='shadow-md  dark:shadow-white rounded p-5 w-full gap-20 flex items-center'>
          <div className="md:w-1/2 md:block hidden">
            <img src={login} alt="" />
            <p className='text-center'>Create an accoute</p>
          </div>
          <div className="md:w-1/2 w-full md:p-0 px-4">
            <h2 className='text-2xl my-2 font-bold'>Sign in</h2>
            <form className='my-5' onSubmit={formik.handleSubmit}>
            {err?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{err}</span>
          </div> : ''}
              <Stack spacing={5}>

                <TextField id="email" onChange={formik.handleChange} value={email ? email : formik.values.email} sx={{
                  input: {
                    color: dark ? 'white' : 'black',
                    "&::placeholder": {    // <----- Add this.
                      opacity: .7,
                    },

                  },
                  label: { color: 'blue' }
                }} placeholder='email' variant="standard" slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" >
                        <AccountCircle sx={dark ? { color: 'white' } : { color: 'black' }} />
                      </InputAdornment>
                    ),
                  }

                }} />

                <TextField onChange={formik.handleChange} value={formik.values.password} slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: dark ? '#fff' : '#000' }}>
                        <Lock />
                      </InputAdornment>
                    ),
                  }
                }} id="password" placeholder='password' sx={{
                  input: {
                    color: dark ? 'white' : 'black',
                    "&::placeholder": {    // <----- Add this.
                      opacity: .7,
                    },
                  },
                  label: { color: 'blue' }
                }} variant="standard" />
                <Button type='submit' variant='contained'>Login</Button>
              </Stack>

            </form>
            <p className='my-5'><span className='mx-2'>Or login with</span> <FacebookLogin
              appId="1811002012761532"
              autoLoad={true}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
              icon="fa-facebook"
              textButton=''
              cssClass="my-facebook-button-class" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
