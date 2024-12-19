// import PropTypes from 'prop-types'
/* eslint-disable react/no-unknown-property */
import { BoxContainer } from '../../components'
import { Carousel } from '../../components/Carousel/Carousel'
import { CardProduct } from '../../components/CardProduct/CardProduct'
import { products } from '../../services/api/data'
import { Canvas } from '@react-three/fiber'
import CoffeeModel3D from '../../components/Model3D/CoffeeModel'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAlertContext, useAuthContext, useCarritoContext } from '../../utils/contexts/useContext'
import { DeleteMethodSecured } from '../../services/api/MongoDb/DeleteMethod'
import { ReplaceSpaceTo } from '../../utils/helpers/ReplaceBlankSpace'
import './css/index.css'


const HomePage = () => {
   const settingsNone = {
      dots: true,
      infinite: false,
      speed: 2000,
      autoplay: false,
      slidesToShow: 5,
      slidesToScroll: 1,
   }
   const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      autoplay: true,
      pauseOnHover: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      cssEase: "linear",
      responsive: [
         {
            breakpoint: 1365,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
            }
         },
         {
            breakpoint: 850,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               autoplay: true,
               autoplaySpeed: true,
               pauseOnHover: true
            }
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               autoplay: true,
               autoplaySpeed: true,
               pauseOnHover: true
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               autoplay: true,
               autoplaySpeed: true,
               pauseOnHover: true
            }
         },
         {
            breakpoint: 392,
            settings: {
               slidesToShow: 0.9,
               slidesToScroll: 1,
               autoplay: true,
               autoplaySpeed: true,
               pauseOnHover: true
            }
         }
      ]
   }
   const settings2 = {
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      pauseOnHover: true,
      // centerMode: true,
      responsive: [
         {
            breakpoint: 1365,
            settings: {
               slidesToShow: 3.5,
               slidesToScroll: 1,
            }
         },
         {
            breakpoint: 800,
            settings: {
               slidesToShow: 2.5,
               slidesToScroll: 1,
            }
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         },
         {
            breakpoint: 392,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   }
   const { userAuth } = useAuthContext()
   const { productosOfDb, pDb } = useCarritoContext()
   const { setMsgAlert, setShowAlert } = useAlertContext()

   const [productos, setProductos] = useState([])
   const [productoRecommend, setProductoRecommend] = useState(null)
   const [reversed, setReversed] = useState(false)

   const productReverse = useCallback(() => {
      const p = productosOfDb.reverse()
      return p
   }, [productosOfDb])

   const setDataProducts = useCallback(async () => {
      await pDb()
      var prod = {}
      await productosOfDb.forEach(item => {
         if (item?.recommended === true) {
            prod = item
         }
      })
      if (Object.keys(prod).length > 0) {
         setProductoRecommend(prod)
      }
      if (reversed === false) {
         const p = productReverse()
         setProductos(productosOfDb.reverse())
         setReversed(true)

      }
      // productosOfDb.filter(item => item.recommended === true)
   }, [productosOfDb, pDb, reversed, productReverse])

   const deleteProductoDef = useCallback(async (id) => {
      const a = await DeleteMethodSecured('/productos/eliminar', userAuth?.userInfo, id)
      console.log(a)
      setMsgAlert({
         mensaje: a?.mensaje,
         status: a?.status,
         type: a?.type
      })
      setShowAlert(true)
      setProductoRecommend(null)
      setDataProducts()
   }, [userAuth, setMsgAlert, setShowAlert, setDataProducts])

   useEffect(() => {
      setDataProducts()
   }, [setDataProducts])

   const valPdb = productosOfDb.length > 0
   const pLn = productosOfDb.length > 5 ? { ...settings2 } : { ...settings }
   const pLN = productosOfDb.length <= 1 ? { ...settingsNone } : pLn
   const sttgs = pLN
   const timeRecommend = productoRecommend !== null ? 8000 : 0
   const arrOfLineProducts = [1, 2, 3, 4, 5, 6]
   return (
      <>
         <BoxContainer classes={"container-slide"}>
            {/* <div style={{ paddingTop: "4.5rem" }}>
               Carrusel (Recomendado [Katios Café], Carrusel Recientes, Noticias)
            </div> */}
            <Carousel timing={[timeRecommend, 14000, 4500]}>
               {/* <div style={{ height: "500px", position: "" }}> */}
               {/* <Slider {...settings} className='carousel'> */}
               {/* <div className="carousel-content"> */}
               {productoRecommend && (
                  <div style={{ height: "510px", width: "100%", display: `${productoRecommend ? 'block' : 'none'}` }}>
                     <div style={{ padding: "5rem 8rem", position: "relative", zIndex: "1" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "start" }}>
                           <div style={{ maxWidth: "650px", marginLeft: "4.5rem", marginRight: "3rem" }}>
                              <CardProduct product={productoRecommend} deleteProductoDef={deleteProductoDef} />
                           </div>
                           <div style={{ maxWidth: "650px", marginRight: "" }}>
                              <h2 style={{ margin: "5px 0px 0px 0px" }}>Café Recomendado: {productoRecommend?.marca}</h2>
                              <p style={{ margin: "5px 0px 10px 0px", textAlign: "", color: "black" }}>{productoRecommend?.descripcion}</p>
                              <div style={{ display: "flex", gap: "10px" }}>
                                 <Link to={`/Coffee/View-Coffee/${ReplaceSpaceTo(productoRecommend?.marca, '-')}/${productoRecommend?._id}`}>
                                    <button>Conoce más...</button>
                                 </Link>
                                 {/* <button>Conoce más</button> */}
                              </div>
                           </div>
                        </div>
                     </div>
                     <img style={{ width: "100%", height: "100%", position: "absolute", top: "0", zIndex: "0", objectFit: "fit" }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="Slide 1" />
                  </div>
               )}
               <div className='slide-op'>
                  <div className='slide-2'>
                     <div className='slide-2-inter'>
                        <div className='inter-2-description'>
                           {/* <h2 style={{ margin: "5px 0px 0px 0px" }}>Próximamente: Modelos 3D</h2> */}
                           {/* <p style={{ margin: "5px 0px 10px 0px", textAlign: "", color: "black" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident corporis fugit iste, eum laborum voluptatibus voluptates quo sint saepe consectetur deleniti! Culpa at in, ad veritatis assumenda numquam quam expedita! */}
                           {/* Commodi quos eveniet, voluptas ea aut quisquam molestias magnam. Consectetur, cupiditate!</p> */}
                           <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", fontSize: "24px" }}>¡Innovación en Camino: Modelos 3D en Desarrollo!</h2>
                           <p style={{ margin: "5px 0px 20px 0px", textAlign: "center", textWrap: "wrap", color: "black" }}>
                              Estamos emocionados de anunciar el próximo gran salto en la evolución de nuestra aplicación: la integración de modelos 3D. Este avance no solo enriquecerá la experiencia del usuario, sino que también abrirá nuevas posibilidades para la visualización y el diseño.
                              <br />
                              <br />
                              Actualmente, estamos trabajando en las últimas etapas del desarrollo para asegurar una implementación fluida y de alta calidad.
                              ¡Mantente atento para más novedades y prepárate para explorar nuevas dimensiones en nuestra plataforma!
                           </p>

                        </div>
                        <div className='inter-2-model'>
                           <Canvas camera={{ zoom: 1.3, position: [0, 0.1, 1] }}>
                              <ambientLight intensity={1} />
                              <pointLight position={[35, 35, 0]} intensity={0.4} />
                              <pointLight position={[-35, 35, 0]} intensity={0.4} />
                              <Suspense fallback={<>Cargando...</>}>
                                 <CoffeeModel3D />
                              </Suspense>
                              <OrbitControls />
                           </Canvas>
                        </div>
                     </div>
                  </div>
                  <img style={{ width: "100%", height: "100%", position: "absolute", top: "0", zIndex: "", objectFit: "fit" }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="Slide 1" />
               </div>
               <div className='slide-op'>
                  <Link to={"/Coffee/List"} className='idk' style={{ textDecoration: "none" }}>
                     <div className='slide-3'>
                        <div className='slide-3-inter'>
                           <div className='inter-3-data'>
                              <h2 style={{ margin: "5px 0px 0px 0px", color: "black" }}>Vitrina Virtual</h2>
                              <p style={{ margin: "5px 0px 10px 0px", textAlign: "center", color: "black" }}>Bienvenido a nuestra Vitrina de Café de Especialidad, donde cada grano cuenta una historia. Nos enorgullecemos de ofrecerte una selección exclusiva de cafés.
                                 <br />
                                 Desde la cosecha hasta la taza. Explora nuestra variedad, descubre nuevas experiencias sensoriales y lleva a casa el verdadero arte del café.</p>
                           </div>
                        </div>
                     </div>
                     <img style={{ width: "100%", height: "100%", position: "absolute", top: "0", objectFit: "fit" }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="Slide 2" />
                  </Link>
               </div>
               {/* <div style={{ height: "510px", width: "100%", background: "blue" }}>
                  </div>
                  <div style={{ height: "510px", width: "100%", background: "cyan" }}>
                     <img style={{ width: "100%", height: "100%", objectFit: "fit" }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Slide 3" />
                  </div>
                  <div style={{ height: "510px", width: "100%", background: "blue" }}>
                     <img style={{ width: "100%", height: "100%", objectFit: "fit" }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="Slide 2" />
                  </div> */}
               {/* </div> */}
               {/* </Slider> */}
               {/* </div> */}
            </Carousel>
         </BoxContainer>
         <BoxContainer classes={"we-space"}>
            <div className="we-space-cont">
               <div className="we-are-we">
                  <div style={{ maxWidth: "500px", marginBottom: "0.5rem", zIndex: "3" }}>
                     <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", color: "black" }}>¿Quiénes Somos?</h2>
                     <p style={{ margin: "5px 0px 10px 0px", textAlign: "center", color: "black" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident corporis fugit iste, eum laborum voluptatibus voluptates quo sint saepe consectetur deleniti! Culpa at in, ad veritatis assumenda numquam quam expedita!
                        Commodi quos eveniet, voluptas ea aut quisquam molestias magnam. Consectetur, cupiditate!</p>
                  </div>
                  <div className='icon-zone'>
                     <img style={{ width: "", height: "180px", borderRadius: "50%", }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="Who are we? Img 1" />
                  </div>
                  <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" className='img-back' alt="Who are we? Img 2" />
               </div>
               <div className="we-are-do">
               <div style={{ maxWidth: "500px", marginTop: "0.5rem", zIndex: "3" }}>
                     <h2 style={{ margin: "5px 0px 0px 0px", color: "black", textAlign: "center" }}>¿Qué Hacemos?</h2>
                     <p style={{ margin: "5px 0px 10px 0px", textAlign: "center", color: "black" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident corporis fugit iste, eum laborum voluptatibus voluptates quo sint saepe consectetur deleniti! Culpa at in, ad veritatis assumenda numquam quam expedita!
                        Commodi quos eveniet, voluptas ea aut quisquam molestias magnam. Consectetur, cupiditate!</p>
                  </div>
                  <div className="icon-zone">
                     <img style={{ width: "", height: "180px", borderRadius: "50%", }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="What are we do? Img 1" />
                  </div>
                  <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" className='img-back' alt="What are we do? Img 2" />
               </div>
            </div>
         </BoxContainer>
         <BoxContainer styles={{ height: "390px", padding: "1rem 4.5rem", background: "brown", borderBottom: "1rem solid black" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               <h2 style={{ margin: "5px 0px" }}>Productos Recientes</h2>
               <Link to="/Coffee/List" style={{ color: "blue" }}>Ver Todo {"->"}</Link>
            </div>
            <div style={{ width: "100%", height: "500px", position: "relative", background: "" }}>

               <Slider {...sttgs} >
                  {!valPdb ? (
                     arrOfLineProducts.map((item, index) => (
                        <div key={index} className='card-lost'>
                           Cargando Producto
                        </div>
                     ))
                     // <div style={{ width: "100%", height: "140px", background: "green" }}>
                     //    <h2 style={{ margin: "100px auto", padding: "12px", width: "250px", height: "", background: "green", textAlign: "center" }}>Sin productos Recientes</h2>
                     // </div>
                  ) : (

                     productos.map((product, index) => (
                        <React.Suspense key={index} fallback={<>Cargando</>}>
                           <CardProduct key={index} product={product} deleteProductoDef={deleteProductoDef} />
                        </React.Suspense>
                     ))

                  )}
               </Slider>
            </div>
         </BoxContainer>
      </>
   )
}

HomePage.propTypes = {
   // children: PropTypes.node
}

export default HomePage