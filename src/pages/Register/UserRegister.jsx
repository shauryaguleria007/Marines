import React, { useState, useEffect, useRef } from 'react'
import { useRegisterUserMutation } from "../../store/services/userApi"
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button, Typography } from "@mui/material"
import { Link } from 'react-router-dom'

export const UserRegister = () => {
    const [RegisterUserMutation, { data, error, isLoading }] = useRegisterUserMutation()
    const navigate = useNavigate()


    const input = useRef(null)
    const [width, setWidth] = useState("400px")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })


    useEffect(() => {
        if (error) console.log(error);
        if (data) {
            if (data.token) localStorage.setItem("Authorization", data.token)
            return navigate("/")
        }

    }, [data, error])

    useEffect(() => {
        setWidth(input?.current?.clientWidth || "400px")
    }, [input])

    const RegisterUser = async (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.name === "") return
        await RegisterUserMutation({ ...formData })
        setFormData({ email: "", password: "", name: "" })
    }

    const googleRegister = async () => {
        const oauthWindow = window.open(
            `${import.meta.env.VITE_SETVER_URL}/api/user/login/google`,
            '_self',
            'width=500,height=600'
        )


        window.addEventListener('message', (event) => {
            console.log(event.origin)
            console.log(event.data)
            if (event.origin === import.meta.env.VITE_SETVER_URL) {
                console.log("here")
                oauthWindow.close()
            }
        })
    }
    return (
        <>
            <Stack sx={{
                height: "100vh",
                widht: "100vw",
                alignItems: "center",
                justifyContent: "center",
            }}
                gap={20}
                direction="row"
            >
                <img src="/logo.jpg" alt="" style={{
                    heigth: 600,
                    width: 600
                }} />

                <form onSubmit={RegisterUser}  >
                    <Stack gap={3} sx={{
                        alignItems: "center",
                    }}>
                        <Typography variant="h2" color={"secondary.dark"} sx={{ ml: 15 }}>
                            Welcome   to Apni mandi.
                        </Typography >
                        <Typography variant="h5" color={"primary"} sx={{ ml: 1 }}>
                            Register as a Customer.
                        </Typography >
                        < TextField type="text" label="name" value={formData.name} onChange={(e) => setFormData((data) => ({ ...data, name: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />
                        <TextField ref={input} type="email" label="email" value={formData.email} onChange={(e) => setFormData((data) => ({ ...data, email: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />
                        < TextField type="password" label="password" value={formData.password} onChange={(e) => setFormData((data) => ({ ...data, password: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />

                        <Stack direction={"row"} sx={{
                            width: width,
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}>
                            <Button disabled={isLoading} variant="contained" size="large" type="submit" >Become a Customer</Button>
                            <Button variant='contained' onClick={googleRegister} >google</Button>

                        </Stack>
                        <Link to="/login" style={{ textDecoration: "none" }}>Already have an account ? Login</Link>
                        <Link to="/register/seller" style={{ textDecoration: "none" }}>create a seller account</Link>
                    </Stack>
                </form>
            </Stack>
        </>
    )
}
