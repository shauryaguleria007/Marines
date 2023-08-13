import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

export const Loading2 = () => {
  return (
    <Stack sx={{
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <CircularProgress color='primary' sx={{}} />
    </Stack>
  )
}
