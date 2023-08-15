
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../../store/services/userApi"
import { Link } from "react-router-dom"
import { Stack, TextField, Button, Typography } from "@mui/material"

export const Login = () => {
  const [LoginUserMutation, { data, error, isLoading }] = useLoginUserMutation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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

  const googleRegister = async () => {
    const oauthWindow = window.open(
      `${import.meta.env.VITE_SETVER_URL}/api/user/login/google`,
      '_self',
      'width=500,height=600'
    )
  }
  const LoginUser = async (e) => {
    e.preventDefault()
    if (formData.email === "" || formData.name === "") return
    await LoginUserMutation({ ...formData })
    setFormData({ email: "", password: "" })
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

        <form onSubmit={LoginUser}  >
          <Stack gap={3} sx={{
            alignItems: "center",
          }}>
            <Typography variant="h2" color={"secondary.dark"} sx={{ ml: 10 }}>
              Welcome back  to Apni mandi.
            </Typography >
            <TextField type="email" label="email" value={formData.email} onChange={(e) => setFormData((data) => ({ ...data, email: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />
            < TextField type="password" label="password" value={formData.password} onChange={(e) => setFormData((data) => ({ ...data, password: e.target.value }))} size="large" variant="filled" sx={{ width: "66.6%" }} />
            <Stack direction={"row"} sx={{
              width: 600,
              alignItems: "center",
              justifyContent: "space-around"
            }}>
              <Button disabled={isLoading} variant="contained" size="large" type="submit" >Login</Button>
              <Button variant='contained' onClick={googleRegister} >google</Button>
            </Stack>
            <Link to="/login/seller" style={{ textDecoration: "none" }}>Login to a seller account .</Link>
            <Link to="/register/user" style={{ textDecoration: "none" }}>Dont have a account?  create a customer account</Link>
          </Stack>
        </form>
      </Stack>
    </>
  )
}
