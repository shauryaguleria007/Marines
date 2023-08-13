import React from 'react'
import { Paper, Stack, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { getUser } from "../../../store/store"
export const Sidebar = () => {
    const user = getUser()


    const addSellerLinks = () => <>
        <Box sx={{
            borderBottom: "1px solid rgba(114, 200, 240, 0.3)",
            width: 0.75,
            pb: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Link to={"/seller"} style={{ textDecoration: 'none' }}>Products</Link>
        </Box>
        <Box sx={{

            borderBottom: "1px solid rgba(114, 200, 240, 0.3)",
            width: 0.75,
            pb: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Link to={"/seller/orders"} style={{ textDecoration: 'none' }}>Orders</Link>
        </Box>
    </>
    return (
        <Paper sx={{
            flexBasis: "17.5%",
            height: 1,
        }}
            elevation={1}>

            <Stack sx={{
                justifyContent: "start",
                alignItems: 'center',
                py: 6
            }}
                gap={3}>
                {
                    user?.role === "SELLER" ? addSellerLinks() : ""
                }
            </Stack>
        </Paper>
    )
}
