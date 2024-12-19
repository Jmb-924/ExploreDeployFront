import PropTypes from 'prop-types'
import './css/dirForm.css'
import { useCallback, useEffect, useState } from 'react'
import { postMethodSecured } from '../../services/api/MongoDb/PostMethod'
import { useAuthContext } from '../../utils/contexts/useContext'

const DirForm = ({ idUser, cancel, dirDescription, hideElem, reloadD }) => {
   const { userAuth } = useAuthContext()
   const [formData, setFormData] = useState({
      departamento: '',
      municipio: '',
      dir: '',
      tipoDir: 0,
      observaciones: '',
      userDir: ''
   })

   const clearForm = useCallback(() => {
      setFormData({
         departamento: '',
         municipio: '',
         dir: '',
         tipoDir: dirDL,
         observaciones: '',
         userDir: idUser,
      })
   }, [idUser, dirDL])

   const dirDL = dirDescription === 'Domicilio' ? 0 : 1

   useEffect(() => {
      setFormData({
         ...formData,
         tipoDir: dirDL,
         userDir: idUser
      })

      if (cancel === false) {
         clearForm()
      }
   }, [idUser, formData, dirDL, cancel, dirDescription, clearForm])

   const changeInput = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const submitForm = async () => {
      console.log(formData);
      return
      const a = await postMethodSecured('/', userAuth?.userInfo, formData)
      if (a?.type === 'Error:') {
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }

      if (a?.type === 'Success:') {
         reloadD()
         clearForm()
         hideElem(false)
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }
   }
   return (
      <>
         <div className="cont-form-add-dir">
            <div className='inputs-dir-place'>
               <div className="input-dir-form">
                  <label htmlFor="">Departamento:</label>
                  <input type="text" className={``} name="departamento" value={formData.departamento} onChange={changeInput} id="departamento" required />
               </div>
               <div className="input-dir-form">
                  <label htmlFor="municipio">Municipio</label>
                  <input type="text" name="municipio" id="municipio" value={formData.municipio} onChange={changeInput} required />
               </div>
            </div>
            <div className="inputs-dir-place">
               <div className="input-dir-form">
                  <label htmlFor="dir">Dirección:</label>
                  <input type="text" name="dir" id="dir" value={formData.dir} onChange={changeInput} required />
               </div>
               <button type="button" className='btn-dir-form' onClick={() => [submitForm()]}>Guardar</button>
            </div>
            <div className='input-dir-obs'>
               <textarea name="observaciones" value={formData.observaciones} onChange={changeInput} id="observaciones" style={{ margin: "0px auto", width: "99%", padding: "10px 0px 0px 5px", fontSize: "16px" }} rows="8" placeholder='Sin Timbre...'></textarea>
            </div>
         </div>
      </>
   )
}

DirForm.propTypes = {
   idUser: PropTypes.string,
   cancel: PropTypes.bool,
   dirDescription: PropTypes.oneOf(['Domicilio', 'Local']).isRequired,
   hideElem: PropTypes.any,
   reloadD: PropTypes.func
   // children: PropTypes.node
}

export {
   DirForm,
}