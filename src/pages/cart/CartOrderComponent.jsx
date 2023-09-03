import React, { useEffect } from 'react'
import { Stack, Paper, Typography, Box, Button } from '@mui/material'
import { useCreateOrderMutation, useGetPaymentDataMutation } from '../../store/services/orderApi';
import { useNotificationContext } from "../../context/notificationContext"
import { userApi } from "../../store/services/userApi"
import { useDispatch } from 'react-redux';

export const CartOrderComponent = ({ data }) => {
    const [createOrder, { data: orderData, isLoading }] = useCreateOrderMutation()
    const [createPayment, { data: paymentData }] = useGetPaymentDataMutation()

    const { notification, addNotification } = useNotificationContext()
    const dispatch = useDispatch()

    const order = async () => {
        await createOrder()
        const key_id = import.meta.env.VITE_rezor_secrete_key
        const paymentData = await createPayment({ amount: data.price })
        const options = {
            key: key_id, // Enter the Key ID generated from the Dashboard
            amount: paymentData?.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Item",
            description: "Testing Name",
            image:
                "https://www.wpbeginner.com/wp-content/uploads/2019/07/howtogeturlofimagesyouuploadinwordpress.png",
            order_id: paymentData?.data.order.id,
            callback_url: `${import.meta.env.VITE_SETVER_URL}/api/order/verify`,
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };


        const razor = new window.Razorpay(options);
        razor.open()

    }

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
                <Button variant='outlined' onClick={order} disabled={isLoading}>
                    Order
                </Button>
            </Stack>
        </Paper >
    )
}
