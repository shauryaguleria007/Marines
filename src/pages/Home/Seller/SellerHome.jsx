import { Sidebar } from "../components/Sidebar"
import { Stack, Box } from "@mui/material"
import { Outlet } from "react-router-dom"
export const SellerHome = () => {
  return <>

    <Stack sx={{
      gap: 2,
      height: "calc(100% - 140px)",
      pt: 1,
    }}
      direction="row">
      <Sidebar />
      <Box sx={{
        flexBasis: "82%",   //delete
      }}>
        <Outlet />
      </Box>
    </Stack>
  </>
}
