import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loading } from "./Loading"
export const AuthCallback = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    React.useEffect(() => {
        const token = searchParams.get("token")
        if (!token) return navigate("/login")
        localStorage.setItem("Authorization", `Bearer ${token}`)
        return navigate("/")
    }, [])
    return (
        <Loading />
    )
}
