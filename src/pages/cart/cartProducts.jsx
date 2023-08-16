import React, { useEffect } from 'react'
import { Stack, Paper, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useLazyGetProductByIdQuery } from '../../store/services/productApi'
import { Loading2 } from '../../components/Loading2'
import { useRemoveFromcartMutation } from '../../store/services/userApi';
export const CartProducts = ({ data }) => {
    return (

        <Stack sx={{
            // border: "1px solid black",
            flexBasis: "75%",
            overflowY: "scroll",
            "::-webkit-scrollbar": {
                display: "none"
            },
            mb: 2
        }} gap={0}>

            {
                data?.map((product) => {
                    return <Product key={product.product} product={product} />
                })
            }
        </Stack >
    )
}


const Product = ({ product }) => {
    const [getProduct, { data }] = useLazyGetProductByIdQuery()
    const [removeFromCart, { isLoading }] = useRemoveFromcartMutation()

    useEffect(() => {
        getProduct(product.product)
    }, []);

    const removeFromCartHandler = () => {
        if (product?.product) removeFromCart({ productId: product.product })
    }
    return <>
        <Paper sx={{
            minHeight: 150,
            maxHeight: 150,
            p: 2
        }} variant='outlined' square>
            <Stack direction="row" gap={4} sx={{
                width: 1,
                height: 1
            }}>
                <Box sx={{
                    minHeight: 1,
                    // border: "1px solid black",
                    minWidth: "25%",
                    position: "relative",
                    backgroundImage: `url(${(data && data.images.length !== 0) ? `${import.meta.env.VITE_SETVER_URL}/api/user/image/${data.images[0]}` : ""})`,
                    backgroundSize: "cover"
                }} />
                <Stack sx={{
                    // border: "1px solid black",
                    minWidth: "60%",
                    minHeight: 1,
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }} direction={"row"}>
                    <Box sx={{}}>
                        <Typography variant="body1" color={"primary.dark"} sx={{ fontFamily: "sans-serif" }}><Typography gutterBottom variant="h6" component="div" color={"primary"} fontWeight={600}>
                            {
                                product.name
                            }
                        </Typography></Typography>
                        {/* <Typography variant="body2" color={"secondary.dark"}>{data?.description}</Typography> */}
                    </Box>
                    <Box sx={{}}><Typography gutterBottom variant="subtitle1" component="div" color={"primary"} fontWeight={600}>
                        Rs        {
                            product.price
                        }
                    </Typography>
                    </Box>
                    <Box sx={{}}>
                        <Typography gutterBottom variant="subtitle1" component="div" color={"primary"} fontWeight={600}>
                            {
                                product?.quantity
                            } kg
                        </Typography>
                    </Box>

                </Stack>
                <IconButton sx={{ alignSelf: "baseline" }} disabled={isLoading} onClick={removeFromCartHandler}> <CloseIcon /></IconButton>
            </Stack>
        </Paper>
    </>

}