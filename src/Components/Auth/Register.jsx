import { Box, Stack, TextField, IconButton, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Button } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { darkmode } from '../../Context/darkContext';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function Register() {
  let ref = useRef()
  let navigate = useNavigate()
  const today = dayjs();
  const [value, setValue] = useState(null);
  let [err,setErr] = useState('')
  async function registerFn(values) {
    values.dateOfBirth = formatDate(value ? value.toString() : today.toString())
    try {
      let { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', values)
      if (data.message == 'success') {
        navigate('/login')
        setErr('')
      }
    } catch (error) {
       setErr(error.message)
      
    }
  }


  let validationSchema = Yup.object({
    name: Yup.string().min(2, 'min length is 2 char').max(10, 'max length is 10').required('name is required'),
    email: Yup.string().email().required('email is reqiured'),
    password: Yup.string().matches(/^[A-Z][a-z0-9@]{5,10}$/).required('password id required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')]).required('repassword is required'),
    gender: Yup.string().required()
  })



  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    validationSchema,
    onSubmit: registerFn

  })

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('-');
  }



  let { dark } = useContext(darkmode)
  let [visible, setVisible] = useState(false)

  function toggleVisible() {
    setVisible(!visible)
    if (ref.current.type == 'password')
      ref.current.type = 'text'
    else
      ref.current.type = 'password'
  }
  return (
    <Box sx={{ width: '50%', margin: '20px auto' }}>
      <h2 className='text-2xl my-2 font-bold'>Welcome to Social App</h2>
      <p className='text-gray-400 my-5'>create your account</p>
      <form onSubmit={formik.handleSubmit}>
        {err?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">email already exist</span>
          </div> : ''}
        <Stack spacing={3}>

          <TextField value={formik.values.name} onChange={formik.handleChange} id="name" placeholder="name" variant="standard" sx={{
            input: {
              color: dark ? 'white' : 'black',
              borderBottom: dark ? '2px solid #fff' : '2px solid #000'
            }
          }} />

          {/* alert */}
          {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div> : ''}

          <TextField value={formik.values.email} onChange={formik.handleChange} id="email" placeholder="email" variant="standard" sx={{
            input: {
              color: dark ? 'white' : 'black',
              borderBottom: dark ? '2px solid #fff' : '2px solid #000'
            }
          }} />

          {/* alert */}
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div> : ''}

          <Box sx={{ position: 'relative', width: '100%' }}>
            {
              visible ? <IconButton sx={{ cursor: 'pointer', position: 'absolute', top: "-15px", right: 0 }} aria-label="" onClick={toggleVisible}>
                <VisibilityIcon onClick={toggleVisible} ></VisibilityIcon>
              </IconButton> :
                <IconButton sx={{ cursor: 'pointer', position: 'absolute', top: '-15px', right: 0 }} onClick={toggleVisible} >
                  <VisibilityOffIcon ></VisibilityOffIcon>
                </IconButton>


            }



            <TextField fullWidth  inputRef={ref} id="password"
              sx={{
                input: {
                  color: dark ? 'white' : 'black',
                  borderBottom: dark ? '2px solid #fff' : '2px solid #000'
                }
              }}
              placeholder="password" type="password" variant="standard"
              value={formik.values.password} onChange={formik.handleChange} />
          </Box>
          {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div> : ''}
          <TextField sx={{
            input: {
              color: dark ? 'white' : 'black',
              borderBottom: dark ? '2px solid #fff' : '2px solid #000'
            }
          }} id="rePassword" placeholder="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} type="password" variant="standard" />

          {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div> : ''}
          <div className='flex items-center justify-between'>
            <div className="w-1/2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer fullWidth components={['DatePicker']}>
                  <DatePicker sx={{
                    input: {
                      color: dark ? 'white' : 'black',
                    }
                  }} value={value} onChange={(newvalue) => setValue(newvalue)} defaultValue={today} id="dateOfBirth" fullWidth label="dateOfBirth" />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.dateOfBirth}</span>
            </div> : ''}

            <div className="w-1/2 flex justify-end">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  value={formik.values.gender}
                  name="gender"
                >
                  <FormControlLabel onChange={formik.handleChange} value="female" control={<Radio />} label="Female" />
                  <FormControlLabel onChange={formik.handleChange} value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
              {formik.errors.gender && formik.touched.gender ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{formik.errors.gender}</span>
              </div> : ''}
            </div>

          </div>

          <Button type='submit' variant='contained'>Create an Account</Button>
        </Stack>
      </form>
    </Box>
  )
}
