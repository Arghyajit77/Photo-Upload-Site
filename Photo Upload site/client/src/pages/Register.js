import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Box,Typography,TextField,Button} from '@mui/material'
import toast from 'react-hot-toast';
import axios from "axios";
const Register = () => {
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({
    name:'',
    email:'',
    password:'',
  })
  // hendelchange
  const handleChange=(e)=>{
setInputs((PrevState)=>({
  ...PrevState,
  [e.target.name]:e.target.value,
}))
  }
// Form Handel
const handlesubmit=async(e)=>{
  e.preventDefault()//preventDefault:when we submit my from then all fillup box will show blank 
 try {
  const {data}=await axios.post("/api/v1/user/register",{
    username:inputs.name,
    email:inputs.email,
    password:inputs.password
  });
  if(data.success){
    toast.success("Register Successfully");
    navigate("/login");
  }
 } catch (error) {
  console.log(error)
  toast.error("Invalid Register")
 }
}
  return (
    <>
    <form onSubmit={handlesubmit}>
      <Box
        maxWidth={450}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 200px #ccc"
        padding={3}
        borderRadius={5}
      >
        <Typography
          variant="h4"
          sx={{ textTransform: "uppercase" }}
          padding={3}
          textAlign="center"
        >
          Register
        </Typography>
        <TextField
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
          name="name"
          margin="normal"
          type={"text"}
          required
        />
        <TextField
          placeholder="email"
          value={inputs.email}
          name="email"
          margin="normal"
          type={"email"}
          required
          onChange={handleChange}
        />
        <TextField
          placeholder="password"
          value={inputs.password}
          name="password"
          margin="normal"
          type={"password"}
          required
          onChange={handleChange}
        />

        <Button
          type="submit"
          sx={{ borderRadius: 3, marginTop: 3 }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/login")}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Already Registerd ? Please Login
        </Button>
      </Box>
      </form>
  </>
  )
}

export default Register
