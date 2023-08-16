import React, { useEffect, useState, useMemo } from 'react'
import { AppBar, Typography, Box, Toolbar, IconButton, Tooltip, Badge, Button } from "@mui/material"
import { getUser } from '../../store/store'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useDispatch } from 'react-redux';
import { clearState } from '../../store/features/userSlice';
import { useLazyGetCartDataQuery } from '../../store/services/userApi'
import { useNotificationContext } from '../../context/notificationContext';



export const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = getUser()
    const location = useLocation()
    const { videoInView } = useNotificationContext()

    const [getCart, { data }] = useLazyGetCartDataQuery()
    const [textColor, setTextColor] = useState("white")
    const [barColor, setBarColor] = useState("transparent")


    useEffect(() => {
        setBarColor("transparent")
        setTextColor("custom1.main")
    }, [])

    useEffect(() => {
        if (user && user.role === "USER") {
            getCart()
        }
    }, [user])


    useEffect(() => {
        console.log("here");
        if (videoInView) {
            setBarColor("transparent")
            setTextColor("custom1.main")
        }
        else {
            setBarColor("primary")
            setTextColor("white")
        }
    }, [videoInView])

    const logout = () => {
        // dispatch(api.util.resetApiState());
        localStorage.removeItem("Authorization")
        dispatch(clearState())
        return navigate("/user")
    }

    const addUserLinks = () => {
        return <>
            {location.pathname !== "/user" ? <Link to="/user" style={{
                textDecoration: "none",
            }}>
                <Typography variant="h6" color={textColor}>Home</Typography>
            </Link> : ""}
            {/* <Link to="/contact" style={{
                textDecoration: "none",
            }}>
                <Typography variant="h6" sx={{ color: "white" }}>Contact Us</Typography >
            </Link > */}

            {/* <Link to="/about" style={{
                textDecoration: "none",
            }}>
                <Typography variant="h6" color={textColor}>About us</Typography>
            </Link> */}
        </>
    }

    const addCartAndLogin = () => {
        if (!user) return <Link to={"/login"}><Button variant='outlined' size='large' color='secondary'><Typography color={textColor}>Login</Typography></Button></Link>
        if (user.role === "USER") return <>
            <Link to="/user/cart">  <IconButton size="large" sx={{ color: textColor, mr: 6 }}>
                <Badge badgeContent={data ? data.total : 0} color='secondary' >
                    <ShoppingBagIcon fontSize="large" />
                </Badge>
            </IconButton> </Link>
            <Button variant='outlined' size='large' color='secondary'><Typography color={textColor} onClick={logout}> Logout</Typography></Button >
        </>

        if (user.role === "SELLER") return <Button variant='outlined' size='large' color='secondary'><Typography color={textColor} onClick={logout}>Logout</Typography></Button>
    }



    return <>
        <AppBar position={location.pathname === "/user" ? "fixed" : "static"} color={barColor} >
            <Toolbar disableGutters>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <img src={"/logo.jpg"} alt="" style={{ "height": "100px", "width": "100px", "borderRadius": "50%" }} />
                </IconButton>
                {/* <Link to={"/user"} style={{ textDecoration: "none" }}> */}
                <Typography
                    variant="h4"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        ml: 4,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 900,
                        letterSpacing: '.3rem',
                        color: textColor,
                        textDecoration: 'none',
                    }}
                >
                    Apni Mandi
                </Typography>
                {/* </Link> */}
                <Box sx={{ flexGrow: 0.9, display: "flex", gap: 3, ml: 5 }}>
                    {
                        user?.role === "USER" ? addUserLinks() : ""
                    }
                </Box>
                <Tooltip title="">
                    {
                        addCartAndLogin()
                    }
                </Tooltip>
            </Toolbar>
        </AppBar >
    </>
}
