import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Router } from './Router'
import './index.css'

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', '"Segoe UI"', 'sans-serif'].join(','),
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
)
