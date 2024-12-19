import { faArrowsToEye, faBagShopping, faMinus, faPenToSquare, faPlus, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatNumPrecio } from '../../utils/helpers/NumFormat'
import { agregarAlCarrito } from '../../services/api/IndexedDb/Create/Carrito'

import './css/index.css'
import { useAuthContext, useCarritoContext } from '../../utils/contexts/useContext'
import { Link } from 'react-router-dom'
import { ReplaceSpaceTo } from '../../utils/helpers/ReplaceBlankSpace'
import { AuthValidateToShow } from '../AuthValidate/AuthValidate'
import { GetMethod } from '../../services/api/MongoDb/GetMethod'
import { CountReviewsProduct2 } from '../../utils/helpers/CountReviews'
import { ShowStarsLength } from '../StarsLength/StarsLength'

const CardProductReview = ({ product, deleteProductoDef, }) => {
   const { addToCarrito, updateToCarrito } = useCarritoContext()
   // const { setMsgAlert, setShowAlert } = useAlertContext()
   // Estado para almacenar la información de la bolsa de café seleccionada
   const [selectedBag, setSelectedBag] = useState();
   const [sideCard, setSideCard] = useState(null)
   const { userAuth } = useAuthContext()
   // const [indexBag, setIndexBag] = useState(null)

   const [formData, setFormData] = useState({
      id: product?._id,
      idBag: 0,
      idMol: 0,
      cant: 1,
      total: 0,
      precio: 0,
   })

   const [lr, setLR] = useState(0)
   const getReviewsDb = useCallback(async () => {
      const a = await GetMethod(`/productos/reviews/producto/${product?._id}`)
      // setReviewsP(a)
      const d = await CountReviewsProduct2(a)
      console.log(d)
      setLR(d)
   }, [product])

   const calculateTotalBag = useMemo(() => {
      var precio = !selectedBag ? 0 : selectedBag?.precio
      var calculate = precio * formData.cant
      return calculate
   }, [selectedBag, formData])


   // const handleInputChange = (e) => {
   //    // e.preventDefault()
   //    const { name, value } = e.target
   //    setFormData({
   //       ...formData,
   //       [name]: parseInt(value)
   //    })
   // }

   const submitForm = async (e) => {
      e.preventDefault()
      formData.total = calculateTotalBag
      formData.precio = selectedBag?.precio
      await agregarAlCarrito(formData).then(async (res) => {
         if (res.status === 200) {
            // console.log(res.mensaje)
            // await setMsgAlert({
            //    mensaje: res?.mensaje,
            //    status: res?.status,
            //    type: res?.type,
            // })
            // await setShowAlert(true)
            updateToCarrito()
            alert(`${res?.type} ${res?.status} - ${res?.mensaje}`)
         } else if (res.status === 201) {
            // console.log(res.mensaje)
            // await setMsgAlert({
            //    mensaje: res?.mensaje,
            //    status: res?.status,
            //    type: res?.type,
            // })
            // await setShowAlert(true)
            addToCarrito(formData)
            alert(`${res?.type} ${res?.status} - ${res?.mensaje}`)
         }
      }).catch(error => console.log(error))
      // console.log(formData)
      // clearData()
   }

   // Manejar cambio de selección de la bolsa de café
   // const handleBagChange = (event) => {
   //    const selectedIndex = parseInt(event.target.value);
   //    setSelectedBag(product.bags[selectedIndex]);
   //    // setIndexBag(product.bags[selectedIndex])
   //    handleInputChange(event)
   // };

   const clearData = () => {
      setFormData({
         id: product._id,
         idBag: 0,
         idMol: 0,
         cant: 1,
         total: 0,
         precio: 0
      })
      setSelectedBag(product.bags[0])
      setSideCard(null)
      setBagActive({ active: true, who: 0 })
      setMolActive({ active: true, who: 0 })

      // setIndexBag(null)
   }

   const addCant = (cantidad) => {
      var c = cantidad + 1

      setFormData({
         ...formData,
         cant: c
      })
   }
   const restCant = (cantidad) => {
      var c = cantidad - 1
      if (c < 1) {
         c = 1
      }
      setFormData({
         ...formData,
         cant: c
      })
   }

   const ad = (name, index) => {
      setFormData({
         ...formData,
         [name]: index
      })
   }

   const aad = (index, name) => {
      console.log(product.bags[index])
      setSelectedBag(product.bags[index])

      ad(name, index)
   }

   const [bagActive, setBagActive] = useState({ active: true, who: 0 })
   const [molActive, setMolActive] = useState({ active: true, who: 0 })
   const [rotateCard, setRotateCard] = useState(false)

   const [nameMarca, setNameMarca] = useState('')

   useEffect(() => {
      setSelectedBag(product?.bags[0])
      const a = ReplaceSpaceTo(product?.marca, '-')
      setNameMarca(a)
      getReviewsDb()
   }, [product, getReviewsDb])
   return (
      <div className="card" onMouseLeave={() => [setTimeout(() => [setRotateCard(false)], 250), setTimeout(() => clearData(), 250)]}>
         <div className={`content-card ${rotateCard && "rotate-card"}`}>
            <div className="front-card">
               {/* NextLine: Its a <Link> not a <div> */}
               <Link className='redirect-view-content' to={`/Coffee/View-Coffee/${ReplaceSpaceTo(nameMarca, '-')}/${product?._id}`}>
                  <div style={{ height: `${"225px"}`, minHeight: "" }}>
                     <p className="marca-product">{product?.marca}</p>
                     <img src={`data:${product?.imgs[0]?.contentType};base64,${product?.imgs[0]?.data}`} height={"220px"} width={"100%"} className="img-product" alt="Coffee Picture" />
                  </div>
                  {/* r: redirect */}
                  <div className="r-view-hovered-card"><FontAwesomeIcon icon={faArrowsToEye} style={{ height: "2rem" }} /></div>
               </Link>
               <div className="information-card">
                  <div className="basic-info-card">
                     {/* <h4 className='origen-product'>Andes Antioquia</h4> */}
                     <div>
                        <div className="prev-options-product">
                           <p className='prev-title'>Origen:</p>
                           <p className='prev-text'>{product.origen}</p>
                        </div>
                        <div className="prev-options-product">
                           <p className='prev-title'>Variedad:</p>
                           <p className='prev-text'>{product.variedad}</p>
                        </div>
                        <div className="prev-options-product">
                           <p className='prev-title'>Reviews:</p>
                           <p className='prev-text'>
                              <ShowStarsLength num={lr} />
                              {/* <FontAwesomeIcon icon={faStar} /> */}
                              {/* <FontAwesomeIcon icon={faStar} /> */}
                              {/* <FontAwesomeIcon icon={faStar} /> */}
                              {/* <FontAwesomeIcon icon={faStar} /> */}
                              {/* <FontAwesomeIcon icon={faStar} /> */}
                              {/* <FontAwesomeIcon icon={faStarHalfStroke} className='ii' /> */}
                           </p>
                        </div>
                     </div>
                  </div>
                  {/* act: actions */}
                  <div className="act-view-hovered-card">
                     {/* <button className="act-btn">Vista Previa</button> */}
                     {/* <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}> */}
                     <div style={{ width: "100%", marginLeft: "10px" }}>
                        <button title='Vista Previa' onClick={() => [setRotateCard(true), setSideCard("view")]} className="act-btn">Vista Previa</button>
                        <button title='Compra Rápida' onClick={() => [setRotateCard(true), setSideCard("buy")]} className="act-btn">Compra Rápida</button>
                     </div>
                     <AuthValidateToShow>
                        {userAuth?.userId?.r === '4dm1n' && (
                           <div style={{ display: "", width: "24%" }}>
                              {/* <Link to={`/Coffee/Edit-Coffee/${product?._id}`}>
                                 <button className="act-btn-edit"><FontAwesomeIcon icon={faPenToSquare} /></button>
                              </Link> */}
                              {!deleteProductoDef ? null : (
                                 <button title='Eliminar Producto' onClick={() => deleteProductoDef(product?._id)} className="act-btn-delete"><FontAwesomeIcon icon={faTrashArrowUp} /></button>
                              )}
                           </div>
                        )}
                        {(userAuth?.userId?.r === 't13nd4' && product?.userCoffee?._id === userAuth?.userId?.id) && (
                           <div style={{ display: "", width: "24%" }}>
                              {/* <Link to={`/Coffee/Edit-Coffee/${product?.id}`}> */}
                                 {/* <button className="act-btn-edit"><FontAwesomeIcon icon={faPenToSquare} /></button> */}
                              {/* </Link> */}
                              {!deleteProductoDef ? null : (
                                 <button title='Eliminar Producto' onClick={() => deleteProductoDef(product?._id)} className="act-btn-delete"><FontAwesomeIcon icon={faTrashArrowUp} /></button>
                              )}
                              {/* <button className="act-btn-delete"><FontAwesomeIcon icon={faTrashArrowUp} /></button> */}
                           </div>
                        )}
                     </AuthValidateToShow>
                     {/* </div> */}
                  </div>
               </div>
            </div>
            <div className="back-card">
               {sideCard === "view" && (
                  <div className='preview-info-coffee'>
                     <div className='preview-notas-coffee'>
                        <h4 className='preview-title'>Notas - Puntaje: {product?.perfil?.puntaje}</h4>
                        <div style={{ padding: "1px 4px 1px 0px" }}>
                           {product?.perfil?.notas?.map((dato, index) => (
                              <div key={index} className={`preview-notas ${dato?.d2 <= 90 && 'lower-nota-hovered'}`} style={{ width: `${dato?.d2}%`, background: "gray" }}>
                                 <p style={{ display: `${dato?.d2 <= 25 ? "none" : "block"}`, }}>{dato?.d1}</p>
                                 <p style={{ fontSize: `${dato?.d2 <= 25 ? "1.05rem" : "0.9rem"}` }}>{dato?.d2}%</p>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className='preview-char-coffee'>
                        <div className='preview-char'>
                           <h4 className='char-title'>Cuerpo:</h4>
                           <p className='char-des'>{product?.perfil?.cuerpo}</p>
                        </div>
                        <div className='preview-char'>
                           <h4 className='char-title'>Tueste:</h4>
                           <p className='char-des'>{product?.perfil?.tueste}</p>
                        </div>
                        <div className='preview-char'>
                           <h4 className='char-title'>Proceso:</h4>
                           <p className='char-des'>{product?.proceso}</p>
                        </div>
                     </div>
                     {/* <div style={{ textAlign: "", height: "100%", width: "100%", background: "red", borderRadius: "14px"  }}> */}
                     {/* hola */}
                     {/* </div> */}
                  </div>
               )}
               {sideCard === "buy" && (
                  <div className='form-product'>
                     <div className='select-bag-product'>
                        <div className="title">
                           <span>Bolsa</span>
                        </div>
                        <ul className="list-size">
                           {product?.bags?.map((bag, index) => {
                              let validate = bagActive.who === index && bagActive.active === true
                              return (
                                 <li className='item-list' onClick={() => [aad(index, "idBag"), setBagActive({ active: true, who: index })]} key={index}><button className={`item-list-button ${validate && "button-checked"}`}>{bag?.tamano}</button></li>
                              )
                           })}
                           {/* <li className="item-list"><button className="item-list-button">37</button></li> */}
                           {/* <li className="item-list"><button className="item-list-button">38</button></li> */}
                           {/* <li className="item-list"><button className="item-list-button">39</button></li> */}
                           {/* <li className="item-list"><button className="item-list-button">40</button></li> */}
                           {/* <li className="item-list"><button className="item-list-button">41</button></li> */}
                        </ul>
                     </div>
                     <div className={`select-mol-product ${!selectedBag ? "disabled" : ""}`}>
                        <div className="title">
                           <span>Molienda</span>
                        </div>
                        <ul className="list-size">
                           {selectedBag ? selectedBag.molienda.map((option, index) => {
                              let validate = molActive.who === index && bagActive.active === true
                              return (
                                 <li key={index} onClick={() => [ad("idMol", index), setMolActive({ active: true, who: index })]} className='item-list'><button className={`item-list-button ${validate && "button-checked"}`}>{option}</button></li>
                              )
                           }) : (
                              <>
                                 <li className="item-list"><button className="item-list-button">...</button></li>
                                 <li className="item-list"><button className="item-list-button">...</button></li>
                              </>
                           )}
                           {/* <li className="item-list"><button className="item-list-button">39</button></li> */}
                           {/* <li className="item-list"><button className="item-list-button">40</button></li> */}
                           {/* <li className="item-list"><button className="item-list-button">41</button></li> */}
                        </ul>
                        <div className='disabled-cape'></div>
                     </div>
                     <div className='select-cant-product'>
                        <div className="title">
                           <span>Cantidad</span>
                        </div>
                        <div className="select-cant">
                           <div>
                              <button className="minus-button" disabled={formData.cant <= 1} onClick={() => restCant(formData.cant)}><FontAwesomeIcon icon={faMinus} /></button>
                              <button className="show-button" disabled>{formData.cant}</button>
                              <button className="add-button" onClick={() => addCant(formData.cant)}><FontAwesomeIcon icon={faPlus} /></button>
                           </div>
                           <div>
                              <div className="price">
                                 <span>${formatNumPrecio(calculateTotalBag)}</span>
                              </div>
                           </div>
                           {/* <li className="item-list"><button className="item-list-button">40</button></li> */}
                           {/* <li className="item-list"><button className="item-list-button">41</button></li> */}
                        </div>
                     </div>
                     <div className='total-product'>
                        <div className="action">

                           <button className="cart-button" onClick={submitForm}>
                              <FontAwesomeIcon icon={faBagShopping} />
                              <span>Añadir al Costal</span>
                           </button>
                        </div>
                     </div>
                     {/* <div className="size"> */}
                     {/* <span>Size</span> */}
                     {/* </div> */}
                  </div>

               )}
            </div>
         </div>
      </div>
   )
}

CardProductReview.propTypes = {
   product: PropTypes.object,
   deleteProductoDef: PropTypes.func,
   children: PropTypes.node
}

export {
   CardProductReview,
}