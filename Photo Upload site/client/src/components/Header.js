import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
//import { Link } from '../../../routes/blogRoutes'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from "react-hot-toast";
const Header = () => {
  // Global state
  const islogin = useSelector(state => state.islogin);
  //islogin=islogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(islogin)
  // state
  const [value, setValue] = useState()
  const handellogout = () => {
    try {
      dispatch(authActions.logout())
      toast.success("logout successfully");
      navigate('/login')
    } catch (error) {
      // alert("Error In Logout")
    }
  }
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography>
            My Photo Upload App</Typography>
          {islogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="All post" LinkComponent={Link} to="/blogs" />
                <Tab label="My post" LinkComponent={Link} to="/user-blog" />
                <Tab
                  label="Create Post"
                  LinkComponent={Link}
                  to="/create"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!islogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {islogin && (
              <Button onClick={handellogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
