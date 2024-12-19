import { faClose, faScrewdriverWrench, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useState } from 'react'
import './css/index.css'
import { Login } from './components/Login'
import { RegisterUser } from './components/Register'
import { ResetPassword } from './components/ResetPass'
import { useAuthContext } from '../../utils/contexts/useContext'
import { Link, Navigate, useLocation } from 'react-router-dom'

const LoginLayout = ({ closeLogin }) => {
   const sectionUse = [
      "Iniciar Sesión",
      "Registrate",
      "Restaurar Contraseña"
   ]

   const [loginSection, setLoginSection] = useState(sectionUse[0])
   const { userAuth, deleteAuth } = useAuthContext()
   const location = useLocation()

   const closeSession = () => {
      // deleteAuth()
      alert('Sesion Cerrada Correctamente')
      return <Navigate to={location.pathname} />
   }

   if (userAuth) {
      return (
         <>
            <div style={{ marginBottom: "0px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 8px", fontSize: "1.3rem", fontWeight: "revert-layer", borderBottom: "1px solid", zIndex: "2" }}>
               <p style={{ fontSize: "1.2rem", margin: "5px 0px", padding: "0px", fontWeight: "600" }}>Account</p>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                  <FontAwesomeIcon icon={faClose} style={{ cursor: "pointer", fontSize: "1.6rem", }} onClickCapture={() => [closeLogin(), setLoginSection(sectionUse[0])]} />
                  {/* <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer", fontSize: "1rem", }} onClick={eliminarTodosLosProductosDelCarrito}  /> */}
               </div>
            </div>
            <div style={{ width: "230px", padding: "5px 10px", }}>
               <Link to={`/Profile/${userAuth?.userId?.id}`} style={{ textDecoration: "none", color: "currentcolor" }} onClick={() => closeLogin()}>
                  <div style={{ display: "flex", background: "", borderRadius: "6px", padding: "5px 6px", marginTop: "5px" }}>
                     <div style={{ marginRight: "8px" }}>
                        <FontAwesomeIcon icon={faUser} />
                     </div>
                     <div style={{ fontWeight: `${location.pathname.includes("/Profile") ? "bold" : ""}` }}>Mi Perfil</div>
                  </div>
               </Link>
               {userAuth?.userId?.r === '4dm1n' && (
                  <Link to={`/P4n3l-${userAuth?.userId?.r}157r471v0`} style={{ textDecoration: "none", color: "currentcolor" }} onClick={() => closeLogin()}>
                     <div style={{ display: "flex", background: "", borderRadius: "6px", padding: "5px 6px", marginTop: "5px" }}>
                        <div style={{ marginRight: "8px" }}>
                           <FontAwesomeIcon icon={faScrewdriverWrench} />
                        </div>
                        <div style={{ fontWeight: `${location.pathname === "/P4n3l-4dm1n157r471v0" ? "bold" : ""}` }}>Administrador</div>
                     </div>
                  </Link>
               )}
               <Link to={`${location.pathname}`} style={{ textDecoration: "none", color: "currentcolor" }} onClick={() => closeLogin()}>
                  <div style={{ display: "flex", background: "", borderRadius: "6px", padding: "5px 6px", marginTop: "5px" }}>
                     <div style={{ marginRight: "8px" }}>
                        <FontAwesomeIcon icon={faSignOut} />
                     </div>
                     <div onClick={() => [deleteAuth(), closeSession()]}>Cerrar Sesión</div>
                  </div>
               </Link>
            </div>
         </>
      )
   }
   return (
      <>
         <div style={{ marginBottom: "0px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 8px", fontSize: "1.3rem", fontWeight: "revert-layer", borderBottom: "1px solid", zIndex: "2" }}>
            <p style={{ fontSize: "1.2rem", margin: "5px 0px", padding: "0px", fontWeight: "600" }}>{loginSection}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
               <FontAwesomeIcon icon={faClose} style={{ cursor: "pointer", fontSize: "1.6rem", }} onClickCapture={() => [closeLogin(), setLoginSection(sectionUse[0])]} />
               {/* <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer", fontSize: "1rem", }} onClick={eliminarTodosLosProductosDelCarrito}  /> */}
            </div>
         </div>
         {loginSection === sectionUse[0] && (
            <Login sectionUse={sectionUse} setLoginSection={setLoginSection} closeLogin={closeLogin} />
         )}
         {loginSection === sectionUse[1] && (
            <RegisterUser sectionUse={sectionUse} setLoginSection={setLoginSection} closeLogin={closeLogin} />
         )}
         {loginSection === sectionUse[2] && (
            <ResetPassword sectionUse={sectionUse} setLoginSection={setLoginSection} />
         )}

      </>
   )
}

LoginLayout.propTypes = {
   closeLogin: PropTypes.any
}

export {
   LoginLayout,
}