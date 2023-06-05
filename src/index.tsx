import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Graph/App'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
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
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
