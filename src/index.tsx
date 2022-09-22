import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import LandingList from './pages/Posts'
import NotFound from './pages/NotFound'
import './styles/globals.scss'
import { createTheme, ThemeProvider } from '@mui/material'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// v5 override syntax
const customTheme = createTheme({
  shape: {
    borderRadius: 10
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
