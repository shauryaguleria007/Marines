import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Loading } from "../components/Loading"
import { useAutenticateUserQuery, useAuthorizeUserQuery, useAuthorizeAdminQuery, useAuthorizeSellerQuery } from "../store/services/userApi"
import { useDispatch } from "react-redux"
import { setUser } from "../store/features/userSlice"

export const Authorizer = () => {
    console.log(import.meta.env.VITE_SETVER_URL);
    const { data, error } = useAutenticateUserQuery()
    const navigate = useNavigate()
    useEffect(() => {
        if (data) {
            return navigate(`${data.path}`)
        }
        if (error) {
            console.log(error);
            return navigate("/login")
        }
    }, [data, error])

    return <Loading />
}

export const UserAuthorizer = () => {
    const { data, error } = useAuthorizeUserQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) return navigate("/login")
        if (data) { console.log(data); dispatch(setUser({ name: data.name, email: data.email })) }
    }, [data, error])

    return <>
        {
            data ? <Outlet /> : <Loading />
        }
    </>
}



export const SellerAuthorizer = () => {
    const { data, error } = useAuthorizeSellerQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) return navigate("/login")
        if (data) { console.log(data); dispatch(setUser({ name: data.name, email: data.email })) }
    }, [data, error])

    return <>
        {
            data ? <Outlet /> : <Loading />
        }
    </>
}


export const AdminAuthorizer = () => {
    const { data, error } = useAuthorizeAdminQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) return navigate("/login")
        if (data) { console.log(data); dispatch(setUser({ name: data.name, email: data.email })) }
    }, [data, error])

    return <>
        {
            data ? <Outlet /> : <Loading />
        }
    </>
}