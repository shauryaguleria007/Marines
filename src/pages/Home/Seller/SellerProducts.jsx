import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack, Box, Modal, Typography, TextField } from '@mui/material'
import { useAddProductMutation } from '../../../store/services/productApi';
import { useNotificationContext } from "../../../context/notificationContext"
import { useLazyGetSellerProductQuery } from '../../../store/services/productApi';
import { getUser } from "../../../store/store"
import { Loading2 } from "../../../components/Loading2"

export const SellerProducts = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [getSellerProducts, { data, error, isLoading }] = useLazyGetSellerProductQuery()
    const user = getUser()

    useEffect(() => {
        if (user.id) getSellerProducts(user.id)
    }, [user])


    useEffect(() => {
        if (data) {
            console.log(data);
        }
        if (error)
            console.log(error);
    }, [data, error])


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
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">Delivered</TableCell>
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
                        {data?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.stock}</TableCell>
                            </TableRow>
                        ))}
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
                <Button variant="contained" onClick={handleOpen}>Add new</Button>
            </Stack>
            <ModalForm open={open} handleClose={handleClose} />
        </Paper>
    );
}




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    py: 8
}


const ModalForm = ({ open, handleClose }) => {
    const [addProductApi, { data, error, isLoading }] = useAddProductMutation()
    const { notification, addNotification } = useNotificationContext()

    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        stock: 0,
        description: ""
    })
    const addProduct = async (e) => {
        e.preventDefault()
        await addProductApi({ ...formData })
        console.log(formData);
    }


    useEffect(() => {
        if (data) {
            addNotification(`${formData.name} created `, notification?.sevierity.success)
            setFormData({
                name: "",
                price: 0,
                stock: 0,
                description: ""
            })
            handleClose()
        }
        if (error) { console.log(error); }
    }, [data, error])
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <form onSubmit={addProduct}  >
                    <Stack gap={3} sx={{
                        alignItems: "center",
                    }}>

                        <Typography variant='h5' sx={{
                            color: "secondary.dark"
                        }}>
                            add new Product .
                        </Typography>
                        <TextField type="text" label="name" value={formData.name} onChange={(e) => setFormData((data) => ({ ...data, name: e.target.value }))} size="small" variant="filled" sx={{ width: "66.6%" }} />
                        <Stack direction="row" gap={1}>
                            < TextField type="number" label="price" value={formData.price} onChange={(e) => setFormData((data) => ({ ...data, price: e.target.value }))} size="small" variant="filled" sx={{ width: "66.6%" }} />
                            < TextField type="number" label="stock" value={formData.stock} onChange={(e) => setFormData((data) => ({ ...data, stock: e.target.value }))} size="small" variant="filled" sx={{ width: "66.6%" }} />
                        </Stack>
                        < TextField type="text" label="description" value={formData.description} onChange={(e) => setFormData((data) => ({ ...data, description: e.target.value }))} size="small" variant="filled" sx={{ width: "66.6%" }} multiline maxRows={3}
                        />
                        {/* <Button
                            variant="contained"
                            component="label" */}
                        {/* > */}
                        {/* Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button> */}
                        <Stack justifyContent={"space-evenly"} direction="row" sx={{
                            width: 1
                        }}>
                            <Button variant='text' onClick={handleClose}>Cancle</Button>
                            <Button disabled={isLoading} variant="contained" size="large" type="submit" >create Product</Button>

                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}