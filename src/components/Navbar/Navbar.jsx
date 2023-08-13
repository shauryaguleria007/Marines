import React from 'react'
import { AppBar, Container, Typography, Box, Toolbar, Button, IconButton } from "@mui/material"
import { getUser } from '../../store/store'

const pages = ["s", "sd"]
export const Navbar = () => {

    const user = getUser()
    console.log(user);
    return <>
        <AppBar position="static" sx={{ m: 0 }}>
            <Container maxWidth="xl">
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
                    <Box>
                        {/* render links here  */}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    </>
}
