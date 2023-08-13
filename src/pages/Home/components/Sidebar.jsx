import React from 'react'
import { Paper, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import { getUser } from "../../../store/store"
export const Sidebar = () => {
    const user = getUser()


    const addSellerLinks = () => <>
        <Link to={"/seller"} style={{ textDecoration: 'none' }}>Products</Link>
        <Link to={"/seller/orders"} style={{ textDecoration: 'none' }}>Orders</Link>
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
