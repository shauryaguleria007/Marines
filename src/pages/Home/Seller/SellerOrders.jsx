import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack, Box, Modal, Typography, TextField } from '@mui/material'
import { useGetAllOrdersQuery } from '../../../store/services/orderApi';
import { useNotificationContext } from "../../../context/notificationContext"
import { useLazyGetSellerProductQuery } from '../../../store/services/productApi';
import { getUser } from "../../../store/store"
import { Loading2 } from "../../../components/Loading2"
import { MuiFileInput } from "mui-file-input"


export const SellerOrders = () => {


    const { data, error, isLoading } = useGetAllOrdersQuery()
    const user = getUser()

    useEffect(() => { if (data) console.log("order", data); }, [data])
    return (
        <Paper sx={{
            height: 1,

        }} elevation={0}>
            <TableContainer component={Paper} sx={{
                height: 0.85,
                "::-webkit-scrollbar": {
                    display: "none"
                },
            }}>
                <Table stickyHeader sx={{ height: 1 }} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">bill </TableCell>
                            <TableCell align="right">quanitiy</TableCell>
                            <TableCell align="right">customer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {

                            isLoading ? <TableRow>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"><Loading2 /></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>

                            </TableRow> : ""

                        }
                        {data?.map((row) => {
                            console.log(data)
                            return <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row?.product.name}</TableCell>
                                <TableCell align="right">{row?.bill_amount}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.user?.name}</TableCell>

                            </TableRow>

                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack sx={{
                m: 2,
                alignItems: "center",
                justifyContent: "space-around"
            }}
                direction={"row"}>
                {/* <Box>page box</Box> */}
            </Stack>
        </Paper>
    );
}

