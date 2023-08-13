import { useEffect } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { setUser } from "../store/features/userSlice"
import { useDispatch } from "react-redux"
import { Loading } from "../components/Loading"
import { useAutenticateUserQuery } from "../store/services/userApi"
import { getUser } from "../store/store"
import { Navbar } from "./Navbar/Navbar"
import { Box } from "@mui/material"

export const Authorizer = () => {
    const { data, error, isLoading } = useAutenticateUserQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (data) {
            const path = data.role === "SELLER" ? "/seller" : "/user"
            dispatch(setUser(data))
            if (location.pathname === path) return
            return navigate(`${path}`)
        }
        if (error) {
            console.log(error)
            return navigate("/login")
        }
    }, [
        data, error
    ])

    if (data) return <>
        <Box sx={{
            height: "99.8vh",
            width: "99.8vw",
            m: 0,
            p: 0,
        }}>
            <Navbar />
            <Outlet />
        </Box>
    </>
    return <Loading />
}

export const UserAuthorizer = () => {
    const user = getUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return
        if (user.role !== "USER") return navigate("/login")
    }, [user])
    if (!user) return <Loading />
    return <Outlet />
}


export const SellerAuthorizer = () => {
    const user = getUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return
        if (user.role !== "SELLER") return navigate("/login")
    }, [user])
    if (!user) return <Loading />
    return <Outlet />
}


export const AdminAuthorizer = () => {
    return <Outlet />
}