import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"



export const Authorizer = () => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (location.pathname === "/") {
            return navigate("/user/home")
        }
    }, [location])
    return <>
        <Outlet />
    </>
}

export const UserAuthorizer = () => {
    return <>
        <Outlet />
    </>
}



export const SellerAuthorizer = () => {
    return <>
        <Outlet />
    </>
}


export const AdminAuthorizer = () => {
    return <>
        <Outlet />
    </>
}