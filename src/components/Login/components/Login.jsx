import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { postMethod } from '../../../services/api/MongoDb/PostMethod'
import { useState } from 'react'
import { useAlertContext, useAuthContext } from '../../../utils/contexts/useContext'

const Login = ({ sectionUse, setLoginSection, closeLogin }) => {
   const { createAuth, } = useAuthContext()
   const { setMsgAlert, setShowAlert } = useAlertContext()
   const [formData, setFormData] = useState({
      correo: '',
      contraseña: '',
      recordar: false
   })
   const [formMsg, setFormMsg] = useState({
      correo: {
         error: false,
         msg: ''
      },
      pass: {
         error: false,
         msg: ''
      }
   })

   const inputChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }


   // { userId: { i: id, r: rol }, userInfo: token, expiredTime: venceToken }
   const sendForm = async (e) => {
      e.preventDefault()
      const result = await postMethod('/usuarios/iniciar-sesion', formData)
      if(result?.dataRes === 'correo') {
         setFormMsg({
            ...formMsg,
            correo: {
               error: true,
               msg: result?.mensaje
            },
            pass: {
               error: true,
               msg: ''
            }
         })
         setFormData({
            ...formData,
            contraseña: '',
            recordar: false
         })
      } else if(result?.dataRes === 'password') {
         setFormMsg({
            ...formMsg,
            correo: {
               error: false,
               msg: ''
            },
            pass: {
               error: true,
               msg: result?.mensaje
            }
         })
         setFormData({
            ...formData,
            contraseña: '',
            recordar: false
         })
      } else {
         setFormMsg({
            correo: {
               error: false,
               msg: ''
            },
            pass: {
               error: false,
               msg: ''
            }
         })
         setFormData({
            correo: '',
            contraseña: '',
            recordar: false,
         })
         closeLogin()
         createAuth(result?.dataRes)
         setMsgAlert({
            mensaje: result?.mensaje,
            status: result?.status,
            type: result?.type
         })
         setShowAlert(true)
         // console.log(result) mensaje: 'Acceso Autorizado', status: 200, type: 'Success:', dataRes: token
      }
   }
   return (
      <>
         <div style={{ width: "230px", padding: "5px 10px", }}>
            <form onSubmit={(e) => sendForm(e)} style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "start", marginBottom: "5px" }}>
               <div className="input-form">
                  <label htmlFor="email" className={`${formMsg.correo.error === true ? 'error-label' : ''}`}>Correo:</label>
                  <input type="email" className={`${formMsg.correo.error === true ? 'error-input' : ''}`} name="correo" value={formData.correo} onChange={inputChange} id="email" required />
                  <span className={`msg-error-input ${formMsg.correo.error === true ? 'show-msg' : ''}`}>{formMsg.correo.msg}</span>
               </div>
               <div className="input-form">
                  <label htmlFor="pass" className={`${formMsg.pass.error === true ? 'error-label' : ''}`}>Contraseña:</label>
                  <input type="password" name="contraseña" className={`${formMsg.pass.error === true ? 'error-input' : ''}`} value={formData.contraseña} onChange={inputChange} id="pass" required />
                  <span className={`msg-error-input ${formMsg.pass.error === true ? 'show-msg' : ''}`}>{formMsg.pass.msg}</span>
               </div>
               <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
                  <div className="input-form checkbox">
                     <label htmlFor="recordar">Recordarme</label>
                     <input type="checkbox" name="recordar" id="recordar" checked={formData.recordar} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.checked })} />
                  </div>
                  <button type='submit' style={{ width: "85%", padding: "0.5rem", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }}>Ingresar</button>
               </div>

               <p style={{ cursor: "pointer", margin: "6px 5px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[1])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sin Cuenta? Registrate Gratis Aqui</p>
               <p style={{ cursor: "pointer", margin: "6px 5px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[2])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Olvidaste la Contraseña?</p>
            </form>
         </div>
      </>
   )
}

Login.propTypes = {
   sectionUse: PropTypes.array,
   setLoginSection: PropTypes.any,
   closeLogin: PropTypes.any,
}

export {
   Login,
}