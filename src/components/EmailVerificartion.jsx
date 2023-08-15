import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { useEmailVerificationMutation } from '../store/services/userApi'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 200,
    bgcolor: 'background.paper',
    // border: "1px solid black",
    boxShadow: 24,
    p: 4,
    outline: "none",
    py: 8,
    display: "flex",
}

export const EmailVerificartion = ({ verified }) => {

    const [verifyEmail, { data, isLoading }] = useEmailVerificationMutation()
    const [send, setSend] = useState(true)

    useEffect(() => {
        if (data) {
            setSend(false)
            console.log(data)
        }

        console.log(isLoading);
    }, [data, isLoading])

    const verify = async () => {
        await verifyEmail()
    }

    const buttons = () => {
        if (send) return <>
            <Button sx={{ m: 2 }} variant='contained' size='large' onClick={verify} disabled={isLoading}>send</Button>
        </>

        return <>
            <Button sx={{ m: 2 }} variant='outlined' size='large' onClick={verify} disabled={isLoading}>resend</Button>
        </>
    }

    return (
        <>
            <Modal open={!verified} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Box sx={{
                    }}>
                        <Typography variant="h4" color={"secondary.dark"}>
                            Please verify your email.
                        </Typography>
                        <Typography variant="h6" color={"primary.dark"}>
                            {buttons()} {isLoading ? "sending..." : ""}
                        </Typography >
                        <Typography variant="h6" color={"primary.dark"}>
                            {data && !isLoading ? "email sent successfully." : ""}
                        </Typography >

                    </Box>
                    <Box sx={{
                        // border: "1px solid black",
                        flexBasis: "25%",
                        backgroundImage: "url('logo.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        height: 1,
                        width: 1,
                        ml: 2
                    }} />
                </Box>
            </Modal>
        </>
    )
}
