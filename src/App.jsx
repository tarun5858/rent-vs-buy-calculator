import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Box } from '@mui/material'
import Calculator from './Calculator'
import WhatsAppButton from "./Components/whatsappButton";
  import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
       <WhatsAppButton/>
   
    <Box
        component="main"
        // sx={{
        //   flexGrow: 1,
        //   marginLeft:
        //     isMdOrLarger && !hideBottomNavRoutes.includes(location.pathname)
        //       ? `${sidebarWidth +35}px` // Dynamic adjustment to match sidebar width
        //       : "0",
        //   paddingRight: isMdOrLarger ? '24px' : '0', // Add padding for better spacing
        //   transition: 'margin 0.3s ease-out', // Smooth transition when sidebar width changes
        // }}
      >
          <Box
            // mt={
            //   hideBottomNavRoutes.includes(location.pathname)
            //     ? 0
            //     : isMdOrLarger
            //     ? 2
            //     : 12
            // }
            // mb={hideBottomNavRoutes.includes(location.pathname) ? 0 : 10}
          >
            <Router>
            <Routes>
              <Route path="/" element={<Calculator />} />
            </Routes>
            </Router>

          </Box>
      </Box>
      </div> 
  )
}

export default App
