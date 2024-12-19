import PropTypes from 'prop-types'
import './css/FormReview.css'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../utils/contexts/useContext'
import { formatCommentCreateDate } from '../../../utils/helpers/FechaCommentFormat'
import { postMethodSecured } from '../../../services/api/MongoDb/PostMethod'
const FormReviewPage = ({ idProducto, cancel, hideCancel, reloadR }) => {
   const { userAuth } = useAuthContext()
   const [formData, setFormData] = useState({
      comentario: '',
      stars: 0,
      fecha: '',
      producto: '',
      userReview: ''
   })

   const starsChange = (name, value) => {
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const submitForm = async () => {
      if (formData.comentario === '') {
         return alert('El Comentario es obligatorio')
      }
      formData.fecha = formatCommentCreateDate()
      formData.producto = idProducto
      formData.userReview = userAuth?.userId?.id

      // console.log(formData)
      // '/reviews/crear'
      const a = await postMethodSecured('/productos/reviews/crear', userAuth?.userInfo, formData)
      if (a?.type === 'Error:') {
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }
      
      if (a?.type === 'Success:') {
         reloadR()
         hideCancel(false)
         clearForm()
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }

   }

   const clearForm = () => {
      setFormData({
         comentario: '',
         stars: 0,
         fecha: '',
         producto: '',
         userReview: ''
      })
   }
   
   useEffect(() => {
      if (cancel === true) {
         clearForm()
      }
   }, [cancel])

   return (
      <>
         <div className='editar-comment'>
            <div className="form-top">
               <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "10px" }}>
                  <h4 style={{ margin: "0px", padding: "0px", fontSize: "19px" }}>Puntuación:</h4>
                  <div className="rating">
                     <label htmlFor="star5" className={`${formData.stars === 5 ? 'check' : ''}`} onClick={() => starsChange('stars', 5)}></label>
                     <label htmlFor="star4" className={`${formData.stars === 4 ? 'check' : ''}`} onClick={() => starsChange('stars', 4)}></label>
                     <label htmlFor="star3" className={`${formData.stars === 3 ? 'check' : ''}`} onClick={() => starsChange('stars', 3)}></label>
                     <label htmlFor="star2" className={`${formData.stars === 2 ? 'check' : ''}`} onClick={() => starsChange('stars', 2)}></label>
                     <label htmlFor="star1" className={`${formData.stars === 1 ? 'check' : ''}`} onClick={() => starsChange('stars', 1)}></label>
                  </div>
               </div>
               <button type="button" className='btn-update' onClick={() => [submitForm()]}>Guardar</button>
            </div>
            <div className='input-form-com'>
               <textarea name="comentario" value={formData.comentario} onChange={(e) => starsChange(e.target.name, e.target.value)} id="comentario" style={{ margin: "0px auto", width: "99%", padding: "10px 0px 0px 5px", fontSize: "16px" }} rows="8" placeholder='Comentario...'></textarea>
            </div>
         </div>
      </>
   )
}

FormReviewPage.propTypes = {
   idProducto: PropTypes.any,
   cancel: PropTypes.bool,
   hideCancel: PropTypes.any,
   reloadR: PropTypes.func,
   // children: PropTypes.node
}

export {
   FormReviewPage,
}