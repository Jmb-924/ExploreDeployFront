// import PropTypes from 'prop-types'
import './css/ViewProduct.css'
import { Tabs } from '../../components/Tabs/Tabs'
import { useParams } from 'react-router-dom'
import { useAuthContext, useCarritoContext } from '../../utils/contexts/useContext'
import { useCallback, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FormProductView } from './components/FormProductPage'
import { NotasProductView } from './components/NotasProductPage'
import { PerfilProductView } from './components/PerfilProductPage'
import { Review } from '../../components/Review/Review'
import { FormReviewPage } from './components/FormReview'
import { GetMethod } from '../../services/api/MongoDb/GetMethod'
import { ShowStarsLength } from '../../components/StarsLength/StarsLength'
import { CountReviewsProduct2 } from '../../utils/helpers/CountReviews'

const ViewProductPage = () => {
   const { marca, id } = useParams()
   const { userAuth, } = useAuthContext()
   const { productosOfDb } = useCarritoContext()
   const [producto, setProducto] = useState({})
   const [reviewsP, setReviewsP] = useState([])
   const [lr, setLR] = useState(0)
   const [nav1, setNav1] = useState(null)
   const [nav2, setNav2] = useState(null)

   let sliderRef1 = useRef(null)
   let sliderRef2 = useRef(null)

   const getReviewsDb = useCallback(async () => {
      const a = await GetMethod(`/productos/reviews/producto/${id}`)
      setReviewsP(a)
      const d = await CountReviewsProduct2(a)
      // console.log(d)
      setLR(d)
   }, [id])

   useEffect(() => {
      if (productosOfDb.length > 0) {
         const product = productosOfDb.filter(item => item._id === id)
         // console.log(product)
         setProducto({ ...product[0] })
      }
      // if (producto === undefined) {
      // }
      // console.log(producto)
      setNav1(sliderRef1)
      setNav2(sliderRef2)

      getReviewsDb()
   }, [productosOfDb, id, getReviewsDb])

   const [commentAct, setCommentAct] = useState(false)
   const [cancelVal, setCancelVal] = useState(false)

   const cancelComment = (is) => {
      if (is === false) {
         setCancelVal(true)
      } else {
         setCancelVal(false)
      }
   }

   const [hideProductCel, setHideProductCel] = useState(true)

   const settings1 = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true
   };

   var settings2 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      autoplay: false,
      slidesToShow: 3,
      className: "center",
      centerMode: true,
      centerPadding: "0px",
      // pauseOnHover: true
   };
   const pp = {}
   return (
      <div className='container'>
         <title>{marca}</title>
         <div className='container-producto'>
            <div className='img-container'>
               {producto === pp ? (
                  <>Sin Contenido</>
               ) : (
                  <>
                     <div className="img-container-view">
                        <Slider {...settings1} asNavFor={nav2} ref={slider => (sliderRef1 = slider)} slidesToShow={1}>
                           {/* <ListImg type={'view'} /> */}
                           {producto?.imgs?.map((img, index) => (
                              <div key={index}>
                                 <img className={`img-product-view`} src={`data:${img?.contentType};base64,${img?.data}`} alt={`Img Product ${index}`} />
                              </div>
                           ))}
                        </Slider>
                     </div>
                     <div className="img-container-preview">
                        <Slider {...settings2} asNavFor={nav1} ref={slider => (sliderRef2 = slider)} slidesToShow={3} swipeToSlide focusOnSelect>
                           {/* <ListImg type={'preview'} /> */}
                           {producto?.imgs?.map((img, index) => (
                              <div key={index}>
                                 <img className={`img-product-preview`} src={`data:${img?.contentType};base64,${img?.data}`} alt={`Img Product ${index}`} />
                              </div>
                           ))}
                        </Slider>
                     </div>
                  </>
               )}
            </div>
            <div className='container-info'>
               <div className="top-info">
                  <h4>{marca}</h4>
                  <h4>Puntaje: {producto?.perfil?.puntaje}</h4>
               </div>
               <Tabs headers={['Compra', 'Notas', 'Perfil', 'Historia']}>
                  <div id='compra-section'>
                     <FormProductView product={producto} id={producto?._id} />
                  </div>
                  <div id='notas-section'>
                     <NotasProductView product={producto} />
                  </div>
                  <div id='perfil-section'>
                     <PerfilProductView product={producto} />
                  </div>
                  <div id="description-section">
                     <div className='des-space'>
                        <h4 className='des-title' >Descripción: </h4>
                        <p className='des-des'>{producto?.descripcion}</p>
                     </div>
                  </div>
               </Tabs>
               <div className={`bottom-info ${producto?.recommend === true ? '' : 'center-stars'}`}>
                  <h4 style={{ color: "yellow", display: `${producto?.recommend === true ? 'block' : 'none'}` }}>Recomendado</h4>
                  <div className="stars-product">
                     <ShowStarsLength num={lr} />
                     {/* <FontAwesomeIcon icon={faStar} /> */}
                     {/* <FontAwesomeIcon icon={faStar} /> */}
                     {/* <FontAwesomeIcon icon={faStar} /> */}
                     {/* <FontAwesomeIcon icon={faStar} /> */}
                     {/* <FontAwesomeIcon icon={faStar} /> */}
                  </div>
               </div>
            </div>
         </div>
         <div className='container-reviews-producto'>
            <div className='container-review'>
               {/* componente */}
               <div className="rev-top">
                  {!userAuth ? (
                     <h4>Comentarios</h4>
                  ) : (
                     <>
                        <h4>Añadir Comentario</h4>
                        <button type="button" onClick={() => [setCommentAct(!commentAct), cancelComment(commentAct)]}>{!commentAct ? "Añadir" : "Cancelar" }</button>
                     </>
                  )}
               </div>
               <div className={`rev-rev ${!commentAct ? 'hide-ele' : ''}`}>
                  <FormReviewPage idProducto={id} cancel={cancelVal} hideCancel={setCommentAct} reloadR={getReviewsDb} />
               </div>
               <div className='reviews-db'>
               {/* '/reviews/producto/:productoId' */}
                  {reviewsP.length > 0 ? reviewsP.map((item, index) => (
                     <Review key={index} idProduct={id} review={item} reloadR={getReviewsDb} productoP={producto} pvr />
                  )) : (
                     <div className="without-revs">
                        <h4>Producto Sin Reviews</h4>
                     </div>
                  )}
               </div>
            </div>
            <div className='product-card-option' onMouseLeave={() => setHideProductCel(true)}>
               <div className={`${hideProductCel ? 'hide-ele' : ''}`}>
                  <FormProductView product={producto} id={producto?._id} />
               </div>
               <div className={`pf-space`}>
                  <FormProductView product={producto} id={producto?._id} />
               </div>
               <button type='button' className={`show-form-cel`} onClick={() => setHideProductCel(!hideProductCel)}>{hideProductCel ? 'Comprar' : 'Cancelar'}</button>
            </div>
         </div>
      </div>
   )
}

// ViewProductPage.propTypes = {
// children: PropTypes.node
// }

export default ViewProductPage