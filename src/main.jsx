import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RouterContext } from './utils/contexts/routesContext.jsx'
import { allRoutes } from './routes/routes.js'

import './utils/css/index.css'
import { CarritoContext } from './utils/contexts/carritoContext.jsx'
import { AuthContext } from './utils/contexts/authContext.jsx'
import { AlertContext } from './utils/contexts/alertsContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertContext>
        <AuthContext>
          <CarritoContext>
            <RouterContext value={allRoutes}>
              <App />
            </RouterContext>
          </CarritoContext>
        </AuthContext>
      </AlertContext>
    </BrowserRouter>
  </React.StrictMode>,
)
