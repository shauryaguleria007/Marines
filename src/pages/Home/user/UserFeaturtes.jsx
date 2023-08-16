import React from 'react'
import "./userCSS.css"
import { Stack, Paper, Typography, Box } from "@mui/material"
import { useNotificationContext } from '../../../context/notificationContext'
export const UserFeaturtes = () => {
    const { videoRef } = useNotificationContext()
    return (
        <>
            <Box ref={videoRef} sx={{
                height: "100vh",
                position: "relative",
                top: 0,
                left: 0
            }}> <video src="/3.mp4" autoPlay muted loop>

                </video>
                <div className="">asfsdfasdffffffffff</div>
            </Box>

            <h1 className="heading">our <span>Features</span></h1>
            <Stack className='box-container' sx={{
                // border: "1px solid black",
                my: 4,
                px: 3,
                height: 400,
                justifyContent: "space-between"
            }} direction={"row"}>
                <Paper className='box' sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexBasis: "25%",
                    p: 3,
                    backgroundColor: "custom1.main"
                }} >
                    <img className="img1" src="img1.jpg" alt="" />
                    < Typography variant="h4" color={""}>fresh & organic</Typography>
                    <Typography variant="body1">Organic food has health benefits as well as environmental benefits.
                        Organic farming uses only natural fertilizers such as compost or manure,
                        which helps to increase the nutritional value of the food and also improves the soil contents.
                    </Typography>
                </Paper>
                <Paper className="box"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 3,
                        flexBasis: "25%",
                        backgroundColor: "custom1.main"
                    }}>
                    <img className="img1" src="img2.png" alt="" />
                    <Typography variant="h4">free delivery</Typography>
                    <Typography variant="body1">Free and fast shipping !!! no need to pay additional shipping charges...we offer free over order of Rs 300.
                        experience fresh organic products at your doorstep extra delivery charges excluded on order of Rs 300 and more....
                    </Typography>
                </Paper>
                <Paper className="box"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 3,
                        flexBasis: "25%",
                        backgroundColor: "custom1.main",
                    }}>
                    <img className="img1" src="img3.jpg" alt="" />
                    <Typography variant="h4">easy payments</Typography>
                    <Typography variant="body1">For customer convenience we make payment easy.customer can pay through any mode of payment. we accept UPI (Gpay,PhonePay,paytm) , cash & card..
                    </Typography>
                </Paper>
            </Stack >
            <h1 className="heading">our <span>Products</span></h1>

        </>
    )
}
