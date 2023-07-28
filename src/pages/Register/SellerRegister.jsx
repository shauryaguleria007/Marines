import React, { useState, useEffect } from 'react'
import { useRegisterSellerMutation } from "../../store/services/userApi"
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const SellerRegister = () => {
    const [RegisterSellerMutation, { data, error, isLoading }] = useRegisterSellerMutation()
    const navigate = useNavigate()

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


    const RegisterUser = async (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.name === "") return
        await RegisterSellerMutation({ ...formData })
        setFormData({ email: "", password: "", name: "" })
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
                            Register as a seller.
                        </Typography >
                        < TextField type="text" label="name" value={formData.name} onChange={(e) => setFormData((data) => ({ ...data, name: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />
                        <TextField type="email" label="email" value={formData.email} onChange={(e) => setFormData((data) => ({ ...data, email: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />
                        < TextField type="password" label="password" value={formData.password} onChange={(e) => setFormData((data) => ({ ...data, password: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />

                        <Button disabled={isLoading} variant="contained" size="large" type="submit" >Become a Seller</Button>
                        <Link to="/login" style={{ textDecoration: "none" }}>Already have an account ? Login</Link>
                        <Link to="/register/user" style={{ textDecoration: "none" }}>create a customer account</Link>

                    </Stack>
                </form>
            </Stack>
        </>
    )

}
