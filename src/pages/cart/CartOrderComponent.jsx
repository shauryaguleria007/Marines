import React from 'react'
import { Stack, Paper, Typography, Box } from '@mui/material'


export const CartOrderComponent = ({ data }) => {
    console.log(data);
    return (
        <Paper sx={{
            flexBasis: "23%",
            height: 1,
            // border: "1px solid black"
        }} square variant='outlined'>

            <Stack sx={{
                // border: "1px solid black",
                height: 1,
                alignItems: "center",
                justifyContent: "start",
                p: 4
            }} gap={2}>
                <Typography variant='h4' color={"primary.dark"}>
                    Order Details
                </Typography>

                <Box sx={{
                    // border: "1px solid black",
                    height: 0.5,
                    width: 0.9,
                    overflowY: "scroll",
                    "::-webkit-scrollbar": {
                        display: "none"
                    }
                }}>
                    {
                        data?.data.map(product => {
                            return <Typography key={product._id} variant="h6" color={"success.dark"} my={2}>
                                {
                                    product.quantity
                                }  x {
                                    product.name
                                } : {
                                    product.price
                                }
                            </Typography>
                        })
                    }
                </Box>
                <Typography variant='h6'>
                    Total : {data.price}
                </Typography>
            </Stack>
        </Paper >
    )
}
