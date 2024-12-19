import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { postMethod } from '../../../services/api/MongoDb/PostMethod'
import { useAlertContext, useAuthContext } from '../../../utils/contexts/useContext'
const rolUser = import.meta.env.VITE_ROL_USER
const rolTienda = import.meta.env.VITE_ROL_TIENDA
const RegisterUser = ({ sectionUse, setLoginSection, closeLogin }) => {
   const { setMsgAlert, setShowAlert } = useAlertContext()
   const { createAuth, } = useAuthContext()
   const [formData, setFormData] = useState({
      nombre: '',
      apellidos: '',
      correo: '',
      celular: '',
      contraseña: '',
      beShop: false,
   })
   const [formMsg, setFormMsg] = useState({
      nombre: {
         error: false,
         msg: ''
      },
      apellidos: {
         error: false,
         msg: ''
      },
      correo: {
         error: false,
         msg: ''
      },
      celular: {
         error: false,
         msg: ''
      },
      pass: {
         error: false,
         msg: ''
      },
   })

   const inputChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const sendForm = async (e) => {
      e.preventDefault()
      var data = {}
      if (!formData.beShop) {
         data = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            correo: formData.correo,
            phone: formData.celular,
            contraseña: formData.contraseña,
            rol: rolUser
         }
      } else {
         data = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            correo: formData.correo,
            phone: formData.celular,
            contraseña: formData.contraseña,
            status: 2,
            rol: rolTienda
         }
      }
      // const result = await postMethod('/usuarios/iniciar-sesion', formData)
      const result = await postMethod('/usuarios/crear', data)
      if (result.dataRes === 'correo') {
         setFormMsg({
            ...formMsg,
            correo: {
               error: true,
               msg: result?.mensaje
            }
         })
      } else {
         setFormMsg({
            nombre: {
               error: false,
               msg: ''
            },
            apellidos: {
               error: false,
               msg: ''
            },
            correo: {
               error: false,
               msg: ''
            },
            celular: {
               error: false,
               msg: ''
            },
            pass: {
               error: false,
               msg: ''
            },
         })
         setFormData({
            nombre: '',
            apellidos: '',
            correo: '',
            celular: '',
            contraseña: '',
            beShop: false,
         })
         closeLogin()
         // await setMsgAlert({
         //    mensaje: result?.mensaje,
         //    status: result?.status,
         //    type: result?.type
         // })
         alert(`${result?.type} ${result?.status} - ${result?.mensaje}`)
         // await setShowAlert(true)
         
         const resultL = await postMethod('/usuarios/iniciar-sesion', result?.dataRes)
         createAuth(resultL?.dataRes)
         alert(`${resultL?.type} ${resultL?.status} - ${resultL?.mensaje}`)
         // setMsgAlert({
         //    mensaje: resultL?.mensaje,
         //    status: resultL?.status,
         //    type: resultL?.type
         // })
         // setShowAlert(true)
      }
      console.log(data)
   }

   return (
      <>
         <div style={{ width: "324px", padding: "5px 10px", }}>
            <form onSubmit={(e) => sendForm(e)} style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "start", marginBottom: "5px" }}>
               <div style={{ width: "", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0px" }}>
                  <div className="input-form flexed">
                     <label htmlFor="nombre" className={`${formMsg.nombre.error === true ? 'error-label' : ''}`}>Nombre:</label>
                     <input type="text" name="nombre" className={`${formMsg.nombre.error === true ? 'error-input' : ''}`} value={formData.nombre} onChange={inputChange} id="nombre" required />
                     <span className={`msg-error-input ${formMsg.nombre.error === true ? 'show-msg' : ''}`}>{formMsg.nombre.msg}</span>
                  </div>

                  <div className="input-form flexed">
                     <label htmlFor="apellidos" className={`${formMsg.apellidos.error === true ? 'error-label' : ''}`}>Apellidos:</label>
                     <input type="text" name="apellidos" className={`${formMsg.apellidos.error === true ? 'error-input' : ''}`} value={formData.apellidos} onChange={inputChange} id="apellidos" required />
                     <span className={`msg-error-input ${formMsg.apellidos.error === true ? 'show-msg' : ''}`}>{formMsg.apellidos.msg}</span>
                  </div>
               </div>
               <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
                  <div className="input-form flexed">
                     <label htmlFor="email" className={`${formMsg.correo.error === true ? 'error-label' : ''}`}>Correo:</label>
                     <input type="email" name="correo" className={`${formMsg.correo.error === true ? 'error-input' : ''}`} value={formData.correo} onChange={inputChange} id="email" required />
                     <span className={`msg-error-input ${formMsg.correo.error === true ? 'show-msg' : ''}`}>{formMsg.correo.msg}</span>
                  </div>

                  <div className="input-form flexed">
                     <label htmlFor="phone" className={`${formMsg.celular.error === true ? 'error-label' : ''}`}>Celular:</label>
                     <input type="number" name="celular" className={`${formMsg.celular.error === true ? 'error-input' : ''}`} value={formData.celular} onChange={inputChange} id="phone" required />
                     <span className={`msg-error-input ${formMsg.celular.error === true ? 'show-msg' : ''}`}>{formMsg.celular.msg}</span>
                  </div>
               </div>

               <div className="input-form">
                  <label htmlFor="pass" className={`${formMsg.pass.error === true ? 'error-label' : ''}`}>Contraseña:</label>
                  <input type="password" name="contraseña" className={`${formMsg.pass.error === true ? 'error-input' : ''}`} value={formData.contraseña} onChange={inputChange} id="pass" required />
                  <span className={`msg-error-input ${formMsg.pass.error === true ? 'show-msg' : ''}`}>{formMsg.pass.msg}</span>
               </div>
               {/* <div style={{ width: "100%",  marginTop: "6px" }}> */}
               {/* </div> */}
               <button type='submit' style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer", margin: "10px 0px 4px 0px" }}>Registrarme</button>
               <div className="input-form checkbox">
                  <label htmlFor="beShop">Acceso a la Vitrina <p style={{ margin: "0px", padding: "0px", fontSize: "0.7rem", color: "gray", width: "85%" }}>(Postula tu Cafe de Especialidad, y enseña la historia que se oculta, tras cada grano)</p> </label>
                  <input type="checkbox" name="beShop" id="beShop" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.checked })} />
               </div>
               <p style={{ cursor: "pointer", margin: "6px 0px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[0])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Ya Tienes Cuenta? Ingresa Aqui</p>

               {/* <p style={{ cursor: "pointer", margin: "6px 5px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[2])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Olvidaste la Contraseña?</p> */}
            </form>
         </div>
      </>
   )
}

RegisterUser.propTypes = {
   sectionUse: PropTypes.array,
   setLoginSection: PropTypes.any,
   closeLogin: PropTypes.any
}

export {
   RegisterUser,
}