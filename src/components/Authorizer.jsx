import { useEffect } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { setUser } from "../store/features/userSlice"
import { useDispatch } from "react-redux"
import { Loading } from "../components/Loading"
import { useAutenticateUserQuery } from "../store/services/userApi"
import { getUser } from "../store/store"
import { Navbar } from "./Navbar/Navbar"
import { Box } from "@mui/material"
import { Footer } from "../components/Footer"
import { EmailVerificartion } from "./EmailVerificartion"





export const Authorizer = () => {
    const { data, error, isLoading } = useAutenticateUserQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (data) {
            console.log(data);
            dispatch(setUser(data))
            const path = data.role === "SELLER" ? "/seller" : "/user"
            if (location.pathname === path) return
            return navigate(`${path}`)
        }
        if (error) {
            if (location.pathname === "/user") return
            return navigate("/user")
        }
    }, [
        data, error
    ])

    if (data || location.pathname === "/user") return <>
        <Box sx={{
            height: "99.8vh",
            width: "99.8vw",
            m: 0,
            p: 0,
            overflowX: "hidden"
        }}>
            <Navbar />
            <Outlet />
            <Footer />
            {data ? <EmailVerificartion verified={data?.verified} /> : ""}
        </Box>
    </>
    return <Loading />
}

export const UserAuthorizer = () => {
    const user = getUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || location.pathname === "/user") return
        if (user.role !== "USER") return navigate("/login")
    }, [user])
    if (!user && location.pathname !== "/user") return <Loading />
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