// import PropTypes from 'prop-types'
import { BoxContainer } from '../../components'
import { products } from '../../services/api/data'
import { CardProduct } from '../../components/CardProduct/CardProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { Link, useLocation } from 'react-router-dom'
import "../css/CatalogoPage.css"
import { AuthValidateToShow } from '../../components/AuthValidate/AuthValidate'
import { useAlertContext, useAuthContext, useCarritoContext } from '../../utils/contexts/useContext'
import { useCallback, useEffect, useState } from 'react'
import { DeleteMethodSecured } from '../../services/api/MongoDb/DeleteMethod'

const CatalogoPage = () => {
   const { userAuth } = useAuthContext()
   const { productosOfDb, pDb } = useCarritoContext()
   const { setMsgAlert, setShowAlert } = useAlertContext()
   const [productos, setProductos] = useState([])
   const valPdb = productos.length > 0
   const valPint = products.length > 0
   const location = useLocation()


   const setDataProducts = useCallback(async () => {
      if (!valPdb) {
         await pDb()
      }
      setProductos(productosOfDb)
   }, [productosOfDb, pDb, valPdb])

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
      location.href = location.pathname
      setDataProducts()
   }, [userAuth, setMsgAlert, setShowAlert, setDataProducts])

   useEffect(() => {
      setDataProducts()
   }, [setDataProducts])

   const arrOfLineProducts = [1, 2, 3,]
   return (
      <>
         <BoxContainer styles={{ height: "60vh", background: "gray" }}>
            <div style={{ height: "100%", width: "100%", position: "relative" }}>
               <img style={{ width: "100%", height: "100%", position: "absolute", top: "0", zIndex: "0", objectFit: "fit" }} src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg" alt="" />
            </div>
         </BoxContainer>
         <BoxContainer styles={{ height: "fit", background: "", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", zIndex: "2", alignItems: "center", padding: "0.8rem 1.8rem 0.8rem 2.5rem", position: "sticky", top: "2.9rem", background: "red", }}>
               <div>
                  <div style={{ fontSize: "1.4rem" }}>Vitrina Virtual</div>
               </div>
               <div>
                  <label htmlFor="aa">Buscar:  </label>
                  <input id='aa' type="text" />
               </div>
            </div>
            <div style={{ display: "flex", padding: "1.5rem 1.8rem 1.5rem 2.5rem", }}>
               {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "start", textAlign: "left", borderRight: "1px solid", width: "140px", }}>
                  <div style={{ fontSize: "1.2rem", padding: "0px 0px 5px 0px", borderBottom: "1px solid", width: "100%" }}>Categorías</div>
                  <div>Filtros</div>
               </div> */}
               <div style={{ padding: "0px 0px", width: "100%", minHeight: '340px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: `${productos.length > 7 ? "center" : "start"}`, }} >
                     {/* <CardRotation /> */}
                     <AuthValidateToShow>
                        {userAuth?.userId?.r === '4dm1n' ? (
                           <div className="card" style={{ display: "inline-block", position: "relative" }}>
                              <Link to={'/Coffee/New-Coffee'} className='link-create-product' style={{ textDecoration: "none", cursor: "pointer", position: "absolute", height: "100%", width: "100%" }}>
                                 <div className="content-card">
                                    <div className="front-card">
                                       <div style={{ border: "5px solid", padding: "10px", borderRadius: "100%", width: "70%", height: "140px", margin: "30% auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                          <FontAwesomeIcon icon={faPlus} style={{ fontWeight: "bold", fontSize: "40px" }} />
                                          <p style={{ margin: '0px', fontWeight: "bold", fontSize: "20px" }}>Añadir Producto</p>
                                       </div>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        ) : null}
                     </AuthValidateToShow>
                     {valPdb && (
                        productos.map((product, index) => (
                           <CardProduct key={index} product={product} deleteProductoDef={deleteProductoDef} />
                        ))
                     )}
                     {!valPdb && (
                        arrOfLineProducts.map((item, index) => (
                           <div key={index} className='card-lost'>
                              Cargando Producto
                           </div>
                        ))
                        // <h2 style={{ margin: "120px auto", padding: "0px", textAlign: "center" }}>Sin productos por listar</h2>
                     )}
                  </div>
               </div>
            </div>
         </BoxContainer>
      </>
   )
}

CatalogoPage.propTypes = {
   // children: PropTypes.node
}

export default CatalogoPage