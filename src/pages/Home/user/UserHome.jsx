
import { UserProducts } from "./UserProducts"
import { Box } from "@mui/material"

export const UserHome = () => {
    return (
        <>
            <Box sx={{
                my: 5
            }}>
                <UserProducts />
            </Box>
        </>
    )
}
