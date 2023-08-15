import React, { useEffect } from 'react'
import { Stack, Paper, Typography, Box, Button } from '@mui/material'
import { useCreateOrderMutation } from '../../store/services/orderApi';
import { useNotificationContext } from "../../context/notificationContext"
import { userApi } from "../../store/services/userApi"
import { useDispatch } from 'react-redux';

export const CartOrderComponent = ({ data }) => {
    const [createOrder, { data: orderData, isLoading }] = useCreateOrderMutation()
    const { notification, addNotification } = useNotificationContext()
    const dispatch = useDispatch()

    useEffect(() => {
        if (orderData) {
            dispatch(userApi.util.invalidateTags(["getCart"]))
            addNotification("orders created ", notification.sevierity.success)

        }
    }, [orderData])

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
                    // "::-webkit-scrollbar": {
                    //     display: "none"
                    // }
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
                <Button variant='outlined' onClick={() => createOrder()} disabled={isLoading}>
                    Order
                </Button>
            </Stack>
        </Paper >
    )
}
