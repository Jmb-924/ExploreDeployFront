// import PropTypes from 'prop-types'

import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GetMethodSecured } from "../../services/api/MongoDb/GetMethod"
import { useAuthContext } from "../../utils/contexts/useContext"

import './css/index.css'
import { FormUpdateUser } from "./components/formUpUser"
import { CheckRolUser } from "../../utils/helpers/CheckRol"
import { CheckStateUser } from "../../utils/helpers/CheckState"
import { TabsExtend } from "../../components/Tabs/TabsExtend"
import { Review } from "../../components/Review/Review"
import { CardProductReview } from "../../components/CardReview/CardReview"
import { DeleteMethodSecured } from "../../services/api/MongoDb/DeleteMethod"
import { DirForm } from "../../components/DirCollection/DirForm"

const Profile = () => {
   const { id } = useParams()
   const { userAuth } = useAuthContext()
   const [showFormUpdate, setShowFormUpdate] = useState(false)

   const [userInfo, setUserInfo] = useState({})
   const [userProducts, setUserProducts] = useState([])
   const [userReviews, setUserReviews] = useState([])
   const [userPedidos, setUserPedido] = useState([])
   const [userDir, setUserDir] = useState([])

   const getUserInfo = useCallback(async () => {
      const a = await GetMethodSecured(`/usuarios/obtener/${id}`, userAuth?.userInfo)
      // console.log(a)
      setUserInfo(a)
      const e = await GetMethodSecured(`/productos/obtener/byUser/${id}`, userAuth?.userInfo)
      // console.log(e);
      setUserProducts(e)
      const b = await GetMethodSecured(`/productos/reviews/obtener/${id}`, userAuth?.userInfo)
      // console.log(b);
      setUserReviews(b?.dataRes)
      const c = await GetMethodSecured(`/productos/pedido/obtenerUser/${id}`, userAuth?.userInfo)
      console.log(c)
      setUserPedido(c)
      const d = await GetMethodSecured(`/direcciones/obtener/userDir/${id}`, userAuth?.userInfo)
      console.log(d);
      setUserDir(d)


   }, [id, userAuth])

   const retDirD = useMemo(() => {
      let cont = 0
      userDir.forEach((item) => {
         if (item?.tipoDir === 0) {
            cont += 1
         }
      })
      return cont
   }, [userDir])

   const retDirL = useMemo(() => {
      let cont = 0
      userDir.forEach((item) => {
         if (item?.tipoDir === 1) {
            cont += 1
         }
      })
      return cont
   }, [userDir])

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


   const defH = useCallback(() => {
      let header = []
      if (userAuth?.userId?.id === id) {
         switch (userAuth?.userId?.r) {
            case '4dm1n':
               header = ['Productos', 'Compras', 'Comentarios', 'Direcciones Domicilio', 'Direcciones Local']
               break;
            case 't13nd4':
               header = ['Productos', 'Compras', 'Comentarios', 'Direcciones Domicilio', 'Direcciones Local']
               break;
            case 'u5u4r10':
               header = ['Compras', 'Comentarios', 'Direcciones Domicilio']
               break;
            default:
               break;
         }
      }
      if (userAuth?.userId?.id !== id) {
         if (userAuth?.userId?.r === '4dm1n') {
            switch (userInfo?.rol?.nameRol) {
               case '4dm1n':
                  header = ['Productos', 'Compras', 'Comentarios', 'Direcciones Domicilio', 'Direcciones Local']
                  break;
               case 't13nd4':
                  header = ['Productos', 'Compras', 'Comentarios', 'Direcciones Domicilio', 'Direcciones Local']
                  break;
               case 'u5u4r10':
                  header = ['Compras', 'Comentarios', 'Direcciones Domicilio']
                  break;
               default:
                  break;
            }
         }
         if (userAuth?.userId?.r === 't13nd4' || userAuth?.userId?.r === 'u5u4r10') {
            switch (userInfo?.rol?.nameRol) {
               case 't13nd4':
                  header = ['Productos', 'Direcciones Local']
                  break;
               case 'u5u4r10':
                  header = ['Comentarios']
                  break;
               default:
                  break;
            }
         }
      }
      // console.log(header);
      return header

   }, [id, userAuth, userInfo])
   const headerTabs = defH()

   const ContP = useCallback(() => {
      return (
         <div id="tb-productos-section">
            <div className="tb-head-top-add">
               <h4>Productos Agregados</h4>
               {userAuth?.userId?.id === id && (
                  <Link to={`/Coffee/New-Coffee`}>
                     <button type="button">Añadir</button>
                  </Link>
               )}
            </div>
            <hr />
            <div className="tb-show-p-list">
               {userProducts.length > 0 ? userProducts.map((item, index) => (
                  <CardProductReview product={item} deleteProductoDef={deleteProductoDef} key={index} />
               )) : (
                  <div className="tb-without-info">
                     <h4>Tienda Sin Productos</h4>
                  </div>
               )}
            </div>
         </div>
      )
   }, [deleteProductoDef, id, userAuth, userProducts])
   const ContC = useCallback(() => {
      return (
         <div id="tb-compra-section">
            <div className="tb-head-top-add">
               <h4>Compras Realizadas</h4>
            </div>
            <hr />
            <div className="tb-show-compra-list">
               {userPedidos.length > 0 ? userPedidos.map((item, index) => (
                  <h4 key={index}>{item?._id}</h4>
               )) : (
                  <div className="tb-without-info">
                     <h4>Usuario sin Compras</h4>
                  </div>
               )}
            </div>
         </div>
      )
   }, [userPedidos])
   const ContCm = useCallback(() => {
      return (
         <div id="tb-comments-section" >
            <div className="tb-head-top-add">
               <h4>Comentarios Realizados</h4>
            </div>
            <hr />
            <div className="tb-show-comm-list">
               {userReviews.length > 0 ? userReviews.map((item, index) => (
                  <Review key={index} idProduct={item?.producto?._id} review={item} reloadR={getUserInfo} productoP={item?.producto} pvr />
               )) : (
                  <div className="tb-without-info">
                     <h4>Usuario Sin Reviews Realizadas</h4>
                  </div>
               )}
            </div>
         </div>
      )
   }, [getUserInfo, userReviews])
   //TODO: Metodos De ContDD = Direcciones Domicilios 
   const [showFormDD, setShowFormDD] = useState(false)

   //*Component D. Domicilios
   const ContDD = useCallback(() => {
      return (
         <div id="tb-dir-domicilio-section" >
            <div className="tb-head-top-add">
               {!userAuth ? (
                  <h4>Dirección de Domicilio</h4>
               ) : (
                  <>
                     {userAuth?.userId?.id === id ? (
                        <>
                           <h4>Dirección de Domicilio</h4>
                           <button onClick={() => setShowFormDD(!showFormDD)} type="button">{!showFormDD ? 'Añadir' : 'Cancelar'}</button>
                        </>
                     ) : (
                        <h4>Dirección de Domicilio</h4>
                     )}
                  </>
               )}
            </div>
            <hr />
            <div className="tb-show-dd-list">
               {showFormDD && (
                  <DirForm idUser={id} cancel={showFormDD} hideElem={setShowFormDD} dirDescription="Domicilio" reloadD={getUserInfo} />
               )}
               {userDir.length > 0 ? userDir.map((item, index) => {
                  if (retDirD > 0) {
                     if (item?.tipoDir === 0) {
                        return (
                           <h4 key={index}>{item?.dir}</h4>
                        )
                     }
                  } else {
                     return (
                        <div className="tb-without-info" key={index}>
                           <h4>Usuario sin Direcciones de Domicilio</h4>
                        </div>
                     )
                  }
               }) : (
                  <div className="tb-without-info">
                     <h4>Usuario sin Direcciones</h4>
                  </div>
               )}
            </div>
         </div>
      )
   }, [retDirD, userDir, getUserInfo, id, showFormDD, userAuth])
   // Metodos De ContDD = Direcciones Domicilios 

   const ContDL = useCallback(() => {
      return (
         <div id="tb-dir-local-section" >
            <div className="tb-head-top-add">
               <h4>Dirección del Local</h4>
               <button type="button">Añadir</button>
            </div>
            <hr />
            <div className="tb-show-dl-list">
               {userDir.length > 0 ? userDir.map((item, index) => {
                  if (retDirL > 0) {
                     if (item?.tipoDir === 1) {
                        return (
                           <h4 key={index}>{item?.dir}</h4>
                        )
                     }
                  } else {
                     return (
                        <div className="tb-without-info" key={index}>
                           <h4>Tienda sin Direcciones de Local</h4>
                        </div>
                     )
                  }
               }) : (
                  <div className="tb-without-info">
                     <h4>Tienda sin Direcciones</h4>
                  </div>
               )}
            </div>
         </div>
      )
   }, [retDirL, userDir])

   const showSectionByHeader = useCallback(() => {
      const tabs = defH()
      let isIn = []
      // tabs.forEach((item) => {

      tabs.includes('Productos') && isIn.push(ContP);
      tabs.includes('Compras') && isIn.push(ContC);
      tabs.includes('Comentarios') && isIn.push(ContCm);
      tabs.includes('Direcciones Domicilio') && isIn.push(ContDD);
      tabs.includes('Direcciones Local') && isIn.push(ContDL);
      // })
      return isIn
   }, [defH, ContP, ContC, ContCm, ContDD, ContDL])
   const ContentHeaders = showSectionByHeader()


   const [infoSeted, setInfoSeted] = useState(null)
   useEffect(() => {
      if (infoSeted === null) {
         getUserInfo()
         setInfoSeted(true)
      }
      // getUserInfo()
      defH()
      // console.log('conts');
      // showSectionByHeader()

   }, [getUserInfo, defH, showSectionByHeader, userInfo, infoSeted])


   return (
      <>
         <div className="prof-cont-info-user">
            <div className="prof-top-info">
               <div className="prof-space-urs">
                  <h2>@{userInfo?.username}</h2>
                  <h4>{CheckRolUser(userInfo?.rol?.nameRol)} | {CheckStateUser(userInfo?.status)}</h4>
               </div>
               {/* solo el usuario due;o de la cuenta, puede ver el boton */}
               {userAuth?.userId?.id === id && (
                  <button onClick={() => setShowFormUpdate(!showFormUpdate)} type="button">{showFormUpdate === false ? 'Actualizar' : 'Cancelar'}</button>
               )}
            </div>
            <div className="prof-space-cont">
               <div className={`prof-update-info ${showFormUpdate === false ? 'prof-d-hide' : ''}`}>
                  <FormUpdateUser showForm={showFormUpdate} setShowForm={setShowFormUpdate} userEd={userInfo} />
               </div>
               <div className="prof-show-info" style={{ flexDirection: `${showFormUpdate === false ? '' : 'column'}` }}>
                  <div className="prof-space-info">
                     <h4>Nombre:</h4>
                     <p>{userInfo?.nombre}</p>
                  </div>
                  <div className="prof-space-info">
                     <h4>Apellidos:</h4>
                     <p>{userInfo?.apellidos}</p>
                  </div>
                  <div className="prof-space-info">
                     <h4>Correo:</h4>
                     <p>{userInfo?.correo}</p>
                  </div>
                  <div className="prof-space-info">
                     <h4>Celular:</h4>
                     <p>{userInfo?.phone}</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="prof-cont-other-info">
            <TabsExtend headers={[...headerTabs]}>
               {ContentHeaders.map((ElementHeader, index) => (
                  <ElementHeader key={index} />
               ))}
            </TabsExtend>
         </div>
      </>
   )
}

Profile.propTypes = {
   // children: PropTypes.node
}

export default Profile