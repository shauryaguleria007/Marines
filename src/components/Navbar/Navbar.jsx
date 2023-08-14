import React, { useEffect } from 'react'
import { AppBar, Typography, Box, Toolbar, IconButton, Tooltip, Badge, Button } from "@mui/material"
import { getUser } from '../../store/store'
import { Link } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useLazyGetCartDataQuery } from '../../store/services/userApi';


export const Navbar = () => {

    const [getCart, { data }] = useLazyGetCartDataQuery()
    const user = getUser()

    useEffect(() => {
        console.log("jeres");
        console.log(user);
        if (user && user.role === "USER") {
            console.log("here");
            getCart()
        }
    }, [user])

    const addUserLinks = () => {
        return <>
            <Link to="/contact" style={{
                textDecoration: "none",
            }}>
                <Typography variant="h6" sx={{ color: "white" }}>Contact Us</Typography >
            </Link >

            <Link to="/about" style={{
                textDecoration: "none",
                color: "white"
            }}>
                <Typography variant="h6" >About us</Typography>
            </Link>
        </>
    }

    const addCartAndLogin = () => {
        if (!user) return <Link to={"/login"}><Button variant='outlined' size='large' color='secondary'><Typography color={"white"}>Login</Typography></Button></Link>
        if (user.role === "USER") return <>
            <IconButton size="large" sx={{ color: "white", mr: 6 }}>
                <Badge badgeContent={data ? data.total : 0} color='secondary' showZero>
                    <ShoppingBagIcon fontSize="large" />
                </Badge>
            </IconButton>
            <Button variant='outlined' size='large' color='secondary'><Typography color={"white"}>Logout</Typography></Button>
        </>

        if (user.role === "SELLER") return <Button variant='outlined' size='large' color='secondary'><Typography color={"white"}>Logout</Typography></Button>
    }

    return <>
        <AppBar position="static" sx={{ m: 0 }}>
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
                <Typography
                    variant="h4"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        ml: 4,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 900,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Apni Mandi
                </Typography>
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
