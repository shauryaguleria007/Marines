import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

export const Loading = () => {
  return (
    <Stack sx={{
      height: "100vh",
      width: "100vw",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <CircularProgress color='primary' sx={{}} />
    </Stack>
  )
}
