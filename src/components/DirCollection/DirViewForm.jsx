import PropTypes from 'prop-types'
import { putMethodSecured } from '../../services/api/MongoDb/PutMethod'
import { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../utils/contexts/useContext'

const DirViewForm = ({ idUser, idDir, dirInfo, dirDescription, reloadD }) => {
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
         ... formData,
         tipoDir: dirDL, 
         userDir: idUser
      })
var xzx = true
      if (xzx === false) {
         clearForm()
      }
   }, [idUser, formData, dirDL, dirDescription, clearForm])

   const changeInput = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const submitForm = async () => {
      console.log(formData);
      const a = await putMethodSecured('/', userAuth?.userInfo, formData)
      if (a?.type === 'Error:') {
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }
      
      if (a?.type === 'Success:') {
         reloadD()
         clearForm()
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }
   }

   const FormDirEdit = useCallback(() => {
      return (
         <></>
      )
   }, [])
   return (
      <></>
   )
}

DirViewForm.propTypes = {
   idUser: PropTypes.string,
   idDir: PropTypes.string,
   dirInfo: PropTypes.object,
   dirDescription: PropTypes.oneOf(["Domicilio", "Local"]).isRequired,
   reloadD: PropTypes.func,
   // children: PropTypes.node
}

export {
   DirViewForm,
}