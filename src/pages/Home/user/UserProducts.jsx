import React, { useEffect } from 'react'
import { useGetAllProductQuery } from "../../../store/services/productApi"
import { Loading2 } from "../../../components/Loading2"
import { Stack, Card, CardMedia, CardActions, Button, CardContent, Typography, Box, Paper } from "@mui/material"
import { getUser } from "../../../store/store"
import { useNotificationContext } from "../../../context/notificationContext"
import { useAddTocartMutation } from '../../../store/services/userApi'

export const UserProducts = () => {
    const { data, error, isLoading } = useGetAllProductQuery()


    if (isLoading) return <Loading2 />

    return (
        <Paper sx={{ p: 4, m: 5 }} square variant='outlined'>
            <Stack direction="row" sx={{
                flexWrap: "wrap",
                alignItem: "space-evenly",
                justifyContent: "space-evenly",
            }} gap={5}>

                {
                    data?.map((product) => {
                        const imageUrl = product?.images.length !== 0 ? `${import.meta.env.VITE_SETVER_URL}/api/user/image/${product.images[0]}` : ""
                        return <Product product={product} key={product._id} imageUrl={imageUrl} />
                    })
                }
            </Stack>
        </Paper>
    )
}




const Product = ({ product, imageUrl }) => {
    const user = getUser()
    const { notification, addNotification } = useNotificationContext()
    const [addToCartApi, { data, error, isLoading }] = useAddTocartMutation()


    useEffect(() => {
        if (data) addNotification(`${product.name} added to cart `, notification.sevierity.success)
        if (error) addNotification(`${product.name} not added .Try again`, notification.sevierity.error)

    }, [data, error])
    const addTocart = () => {
        if (!user) {
            addNotification("please login first .", notification.sevierity.warning)
            return
        }
        addToCartApi({ productId: product._id, quantity: 1 })
    }

    return <Box sx={{
        flexBasis: "20%",
        display: "flex",
        justifyContent: "center",
    }}><Card key={product._id} sx={{
        minHeight: 150,
        maxWidth: 250,
        minWidth: 250,

    }} elevation={20}>
            <CardMedia
                component="img"
                alt={`${product.name}`}
                height="150"
                image={imageUrl}
            />

            <CardContent sx={{
                // backgroundImage: "url(/logo.jpg)",
                backgroundPosition: "right center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
            }}>
                <Typography gutterBottom variant="h5" component="div">
                    {
                        product.name
                    }
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div" color={"primary"} fontWeight={600}>
                    Rs        {
                        product.price
                    }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" onClick={addTocart} disabled={isLoading}> Add to cart</Button>
            </CardActions>
        </Card>
    </Box>
}