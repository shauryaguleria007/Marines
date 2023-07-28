import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { ErrorBoundary } from "react-error-boundary"
import { Error } from "./components/Error/Error.jsx"
import './index.css'
import { createTheme, ThemeProvider, colors } from '@mui/material'
import { store } from './store/store.js'
import { Provider as ReduxToolKitStore } from 'react-redux'

const Theme = createTheme({
  palette: {
    primary: {
      main: colors.green[600]
    },
    secondary: {
      main: colors.orange[600]
    }
  },
  typography: {
    fontFamily: ['Arial',].join(","),
  }
}
)
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider theme={Theme}>
    <ErrorBoundary fallback={<Error />}>
      <ReduxToolKitStore store={store}>
        <App />
      </ReduxToolKitStore>
    </ErrorBoundary>
  </ThemeProvider>
  // </React.StrictMode>,
)
