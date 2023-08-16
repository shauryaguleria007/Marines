
import { UserProducts } from "./UserProducts"
import { UserFeaturtes } from "./UserFeaturtes"
import { Box } from "@mui/material"

export const UserHome = () => {
    return (
        <>
            <Box sx={{
                mb: 5
            }}>
                <UserFeaturtes />
                <UserProducts />
            </Box>
        </>
    )
}
