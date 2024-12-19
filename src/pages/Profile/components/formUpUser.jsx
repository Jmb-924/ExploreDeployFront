import PropTypes from 'prop-types'
import { useAuthContext } from '../../../utils/contexts/useContext'
import { useEffect, useState } from 'react'
import './css/formUpUser.css'
import { putMethodSecured } from '../../../services/api/MongoDb/PutMethod'

const rolTienda = import.meta.env.VITE_ROL_TIENDA

const FormUpdateUser = ({ setShowForm, userEd }) => {
   const { userAuth } = useAuthContext()
   const [formData, setFormData] = useState({
      nombre: '',
      apellidos: '',
      correo: '',
      celular: '',
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
         }
      } else {
         data = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            correo: formData.correo,
            phone: formData.celular,
            status: 2,
            rol: rolTienda
         }
      }
      // const result = await postMethod('/usuarios/iniciar-sesion', formData)
      // const result = await postMethod('/usuarios/crear', data)
      const result = await putMethodSecured(`/usuarios/actualizar/${userEd?._id}`, userAuth?.userInfo, data)
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
         })
         setFormData({
            nombre: '',
            apellidos: '',
            correo: '',
            celular: '',
            beShop: false,
         })
         // closeLogin()
         // await setMsgAlert({
         //    mensaje: result?.mensaje,
         //    status: result?.status,
         //    type: result?.type
         // })
         alert(`${result?.type} ${result?.status} - ${result?.mensaje}`)
         // await setShowAlert(true)
         
         // const resultL = await postMethod('/usuarios/iniciar-sesion', result?.dataRes)
         // createAuth(resultL?.dataRes)
         // alert(`${resultL?.type} ${resultL?.status} - ${resultL?.mensaje}`)
         // setMsgAlert({
         //    mensaje: resultL?.mensaje,
         //    status: resultL?.status,
         //    type: resultL?.type
         // })
         // setShowAlert(true)

         setShowForm(false)
         window.location.href = `/Profile/${userEd?._id}`
      }
      console.log(data)
   }
   useEffect(() => {
      setFormData({
         nombre: userEd?.nombre,
         apellidos: userEd?.apellidos,
         correo: userEd?.correo,
         celular: userEd?.phone,
      })
   }, [userEd,])

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

               {/* <div style={{ width: "100%",  marginTop: "6px" }}> */}
               {/* </div> */}
               <button type='submit' style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer", margin: "10px 0px 4px 0px" }}>Actualizar</button>
               {userEd?.rol?.nameRol === 'u5u4r10' && (
                  <div className="input-form checkbox">
                     <label htmlFor="beShop">Acceso a la Vitrina <p style={{ margin: "0px", padding: "0px", fontSize: "0.7rem", color: "gray", width: "85%" }}>(Postula tu Cafe de Especialidad, y enseña la historia que se oculta, tras cada grano)</p> </label>
                     <input type="checkbox" name="beShop" id="beShop" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.checked })} />
                  </div>
               )}
               {/* <p style={{ cursor: "pointer", margin: "6px 5px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[2])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Olvidaste la Contraseña?</p> */}
            </form>
         </div>
      </>
   )
}

FormUpdateUser.propTypes = {
   setShowForm: PropTypes.func,
   userEd: PropTypes.object
   // children: PropTypes.node
}

export {
   FormUpdateUser,
}