import { Box, Stack, Typography, IconButton, Badge } from "@mui/material"
import { CartProducts } from './cartProducts'
import { useGetCartDataQuery } from "../../store/services/userApi"
import { Loading2 } from "../../components/Loading2"
import { CartOrderComponent } from "./CartOrderComponent"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from "react-router-dom"

export const Cart = () => {
    const { data, error, isLoading } = useGetCartDataQuery()


    if (isLoading) return <Loading2 />
    if (data.data.length === 0) return <Box sx={{
        height: 0.75,
        width: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Typography variant="h1" color="secondary">
            Cart Empty

            <IconButton sx={{ color: "primary", mr: 6 }}>
                <Badge badgeContent={0} color='secondary' showZero>
                    <ShoppingBagIcon fontSize="large" />
                </Badge>
            </IconButton>
        </Typography>
        <Link to={"/user"} >
            <Typography variant="h4" color={"primary.light"}>
                Continue Shopping.
            </Typography>
        </Link>
    </Box >
    return (
        <Stack sx={{
            // border: "1px solid black",
            height: 0.75,
            justifyContent: "space-evenly",
            my: 2
        }}
            direction={"row"}
        >
            <CartProducts data={data?.data} />
            <CartOrderComponent data={data} />
        </Stack>
    )
}
