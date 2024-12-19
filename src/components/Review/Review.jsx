import PropTypes from 'prop-types'
import './css/index.css'
import { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../utils/contexts/useContext'
import { formatCommentUpdateDate } from '../../utils/helpers/FechaCommentFormat'
import { putMethodSecured } from '../../services/api/MongoDb/PutMethod'
import { DeleteMethodSecured } from '../../services/api/MongoDb/DeleteMethod'
import { CardProductReview } from '../CardReview/CardReview'
import { ShowStarsLength } from '../StarsLength/StarsLength'

const Review = ({ idProduct, review, reloadR, productoP, pvr }) => {
   const { userAuth } = useAuthContext()
   const [showOps, setShowOps] = useState(false)
   const [showEdit, setShowEdit] = useState(false)
   const [showPR, setShowPR] = useState(false)
   const [rev, setRev] = useState({
      _id: '',
      comentario: '',
      stars: 0,
      fecha: '',
      producto: {},
      userReview: {}
   })

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

   const submitComment = async () => {
      if (formData.comentario === '') {
         return alert('El Comentario es obligatorio')
      }
      formData.fecha = formatCommentUpdateDate()
      formData.producto = idProduct
      formData.userReview = userAuth?.userId?.id
      console.log(formData)
      // '/reviews/actualizar/:id'
      // '/reviews/eliminar/:id'
      const a = await putMethodSecured(`/productos/reviews/actualizar/${rev?._id}`, userAuth?.userInfo, formData)
      console.log(a)
      if (a?.type === 'Error:') {
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }

      if (a?.type === 'Success:') {
         // setRev({
         //    _id: a?.dataRes._id,
         //    comentario: a?.dataRes?.comentario,
         //    stars: a?.dataRes?.stars,
         //    fecha: a?.dataRes?.fecha,
         //    producto: {...rev?.producto},
         //    userReview: {...rev?.userReview}
         // })
         setShowEdit(false)
         reloadR()
         return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
      }
   }

   const eliminarReview = async () => {
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este comentario?");
      if (confirmDelete) {
         const a = await DeleteMethodSecured(`/productos/reviews/eliminar`, userAuth?.userInfo, rev?._id)
         if (a?.type === "Success:") {
            reloadR()
            return alert(`${a?.type} ${a?.status} - ${a.mensaje}`)
         }
      }
   }

   // const ShowStarsLength = ({ num }) => {
   //    const a = []
   //    for (let i = 1; i <= num; i++) {
   //       a.push(i)
   //    }
   //    return (
   //       <>
   //          {a.length > 0 ? a.map((item, index) => (
   //             <FontAwesomeIcon key={index} icon={faStar} />
   //          )) : (
   //             <h4 style={{ fontSize: "14px" }}>Sin Estrellas</h4>
   //          )}
   //       </>
   //    )
   // }

   const clearForm = () => {
      setFormData({
         comentario: review?.comentario,
         stars: review?.stars,
         fecha: review?.fecha,
         producto: idProduct,
         userReview: userAuth?.userId?.id
      })
   }

   // const [productoImgFinal, setProductoImgFinal] = useState({})
   // const cd = useCallback(async () => {
   //    const ccs = await GetMethod(`/productos/obtener/${idProduct}`)
   //    console.log(ccs)
   //    // setProductoImgFinal(ccs)
   // }, [idProduct])

   const deleteProductoDef = useCallback(async (id) => {
      const a = await DeleteMethodSecured('/productos/eliminar', userAuth?.userInfo, id)
      // console.log(a)
      // setMsgAlert({
      //    mensaje: a?.mensaje,
      //    status: a?.status,
      //    type: a?.type
      // })
      // setShowAlert(true)
      alert(`${a?.type} ${a?.status} - ${a?.mensaje}`)
      location.href = '/Coffee/List'
   }, [userAuth])

   useEffect(() => {
      const da = {
         comentario: '',
         stars: 0,
         fecha: '',
         producto: '',
         userReview: ''
      }

      if (formData === da) {
         setFormData({
            ...formData,
            comentario: review?.comentario,
            stars: review?.stars,
            producto: idProduct,
            userReview: userAuth?.userId?.id
         })
         // console.log(review)
      }
      // console.log(review)
      // cd()
      setRev({
         _id: review._id,
         comentario: review.comentario,
         stars: review.stars,
         fecha: review.fecha,
         producto: { ...review?.producto },
         userReview: { ...review?.userReview }
      })
   }, [review, formData, idProduct, userAuth])
   return (
      <>
         <div className="comment-container" onMouseLeave={() => [setShowOps(false), setShowEdit(false), setShowPR(false), clearForm()]}>
            <div className={`user ${!showEdit ? '' : 'hide-info'}`}>
               <div className="user-info">
                  <span>{rev?.userReview?.username}</span>
                  <p>{rev?.fecha}</p>
               </div>
               <div className='stars-section'>
                  <div className='stars'>
                     <ShowStarsLength num={rev?.stars} />
                  </div>
                  <div className={`options-content ${!pvr ? 'hide-info' : ''}`}>
                     {/*//! Si userAuth.id === review.user.id || Si userAuth.rol === Admin => mostrar options */}
                        <div className='options' onClick={() => setShowOps(!showOps)}>
                           <div className='point'></div>
                           <div className='point'></div>
                           <div className='point'></div>
                        </div>
                     <div className={`show-option ${!showOps ? '' : 'show-cells'}`} onMouseLeave={() => setShowOps(false)}>
                        {pvr && (
                           <div className="option" onClick={() => setShowPR(!showPR)} >{!showPR ? 'Ver' : 'Ocultar'}</div>
                        )}
                        {/*//! Si userAuth.id === review.user.id => mostrar editar/eliminar */}
                        {(userAuth?.userId?.id === rev?.userReview?._id) && (
                           <>
                              <div className="option" onClick={() => setShowEdit(true)}>Editar</div>
                              <div className="option" onClick={() => eliminarReview()} >Eliminar</div>
                           </>
                        )}
                        {(userAuth?.userId?.r === '4dm1n' && userAuth?.userId?.id !== rev?.userReview?._id) && (
                           <div className="option" onClick={() => eliminarReview()} >Eliminar</div>
                        )}
                        {/*//! Si userAuth.rol === Admin => mostrar eliminar */}
                        {/*//*<div className="option">Eliminar</div> */}
                     </div>
                  </div>
               </div>
            </div>
            <p className={`comment-content ${!showEdit ? '' : 'hide-info'}`}>
               {rev?.comentario}
            </p>
            <div className={`editar-comment ${!showEdit ? 'hide-info' : ''}`}>
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
                  <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "10px" }}>
                     <button type="button" className='btn-update' onClick={() => [setShowEdit(false), clearForm()]}>Cancelar</button>
                     <button type="button" className='btn-update' onClick={() => [submitComment()]}>Actualizar</button>
                  </div>
               </div>
               <div className='input-form-com'>
                  <textarea name="comentario" value={formData.comentario} onChange={(e) => starsChange(e.target.name, e.target.value)} id="comentario" style={{ margin: "0px auto", width: "99%", padding: "10px 0px 0px 5px", fontSize: "16px" }} rows="8" placeholder='Comentario...'></textarea>
               </div>
            </div>
            <hr style={{ width: '100%', marginBottom: '5px', display: `${showPR === true ? 'block' : 'none'}` }} />
            {(productoP?.imgs && showPR && pvr) && (
               <CardProductReview product={productoP} deleteProductoDef={deleteProductoDef} />
            )}
         </div>
      </>
   )
}

Review.propTypes = {
   idProduct: PropTypes.any,
   review: PropTypes.object,
   reloadR: PropTypes.func,
   productoP: PropTypes.object,
   pvr: PropTypes.bool
   // children: PropTypes.node
}

export {
   Review,
}