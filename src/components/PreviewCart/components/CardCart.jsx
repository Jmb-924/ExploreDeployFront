import PropTypes from 'prop-types'
import { faRecycle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { products } from "../../../services/api/data"
import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatNumPrecio } from '../../../utils/helpers/NumFormat'
import { updateProductInCart } from '../../../services/api/IndexedDb/Update/Carrito'
import { useCarritoContext } from '../../../utils/contexts/useContext'
import { deleteProductFromCart } from '../../../services/api/IndexedDb/Delete/Carrito'

import '../css/index.css'

const CardCart = () => {
   const { carrito, setCarrito, productosOfDb } = useCarritoContext()
   const [defCant, setDefCant] = useState([])
   // console.log(productsList)
   const calculateTotal = useCallback(() => {
      var total = carrito.reduce((acc, item) => acc + item.total, 0);
      // console.log(total)
      setTotalOfProducts(total);
   }, [carrito])

   const addProduct = async (pedido, cantidad, index) => {
      const c = cantidad + 1
      // console.log(pedido)
      // console.log(cantidad)

      const p = carrito
      p[index].cant = c
      p[index].total = pedido.precio * c
      // console.log("setCarrito: ", p)

      // console.log("upd", p[index])
      // console.log("def", c)
      setDefCant(c)

      await updateProductInCart(p[index]).then(() => {
         setCarrito(p)
         calculateTotal()
      })
   }

   const restProduct = async (pedido, cantidad, index) => {
      const c = cantidad - 1
      // console.log(pedido)
      // console.log(cantidad)

      const p = carrito
      p[index].cant = c
      p[index].total = pedido.precio * c
      // console.log("setCarrito: ", p)

      // console.log("upd", p[index])
      // console.log("def", c)
      setDefCant(c)

      await updateProductInCart(p[index]).then(() => {
         setCarrito(p)
         calculateTotal()
      })
   }

   const deleteProduct = async (id) => {
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
      if (confirmDelete) {
         const filterP = await carrito.filter(item => item.idPedido !== id)
         await deleteProductFromCart(id).then(() => {
            setCarrito(filterP)
         })
      }
   }

   const [useProducts, setUseProducts] = useState([])
   const [totalOfProducts, setTotalOfProducts] = useState(0)



   useEffect(() => {
      const dc = []
      const productosConPedido = carrito.map((item, index) => {
         // Encontrar el producto correspondiente en products
         const productoEncontrado = productosOfDb.find(producto => producto._id === item.id);
         // Filtrar los elementos de productsList que tienen el mismo ID que el producto actual
         // const pedido = carrito.filter(p => p.id === item.id);
         // Crear el nuevo objeto con la información del producto y el pedido
         dc.push(item.cant)
         return {
            productInfo: productoEncontrado,
            pedido: carrito[index]
         };
      });
      setDefCant(dc)
      setUseProducts(productosConPedido)


      calculateTotal()
   }, [carrito, calculateTotal, productosOfDb])




   return (
      <>
         <div className={`${useProducts.length > 3 ? "scroll" : ""}`}>
            {useProducts.map((product, index) => (
               <div key={index}>
                  <li className='listCart' style={{ background: "#6F4E37", display: "flex", gap: "1.2rem", width: "324px", padding: "5px 5px 5px 5px", marginBottom: "5px", border: "1px solid", }}>
                     <div style={{ position: "", width: "5rem", height: "6.5rem", background: "" }}>
                        <img style={{ height: "6.5rem", width: "5rem", objectFit: "fit", }} src={`data:${product?.productInfo?.imgs[0]?.contentType};base64,${product?.productInfo?.imgs[0]?.data}`} alt="Preview de Café" />
                        {/* <img style={{ height: "6rem", width: "5rem", }} src={product.img} alt="Preview de Café" /> */}
                     </div>
                     <div style={{ width: "100%", marginTop: "0px", display: "flex", flexDirection: "column", }}>
                        <div style={{ marginTop: "0px", fontWeight: "500", textAlign: "", fontSize: "1rem" }}>{product?.productInfo?.marca}</div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                           <div style={{ fontWeight: "revert-layer", display: "flex", alignItems: "end" }}>
                              <p style={{ fontSize: "0.9rem", margin: "2px 0px" }}>Tamaño:</p>
                              <p style={{ fontSize: "0.9rem", fontWeight: "lighter", margin: "1px 5px" }}>{product?.productInfo?.bags[product?.pedido?.idBag]?.tamano}</p>
                           </div>
                           <div style={{ fontWeight: "revert-layer", display: "flex", alignItems: "end" }}>
                              <p style={{ fontSize: "0.9rem", margin: "2px 0px" }}>Molienda:</p>
                              <p style={{ fontSize: "0.9rem", fontWeight: "lighter", margin: "1px 5px" }}>{product?.productInfo?.bags[product?.pedido?.idBag]?.molienda[product?.pedido?.idMol]}</p>
                           </div>
                           <div style={{ fontWeight: "revert-layer", display: "flex", alignItems: "center" }}>
                              <p style={{ fontSize: "0.9rem", margin: "2px 0px" }}>Precio:</p>
                              <p style={{ fontSize: "0.9rem", fontWeight: "lighter", margin: "1px 5px" }}>${formatNumPrecio(product?.pedido?.precio * product?.pedido?.cant)}</p>
                           </div>
                        </div>
                     </div>
                     <div style={{ display: "flex", flexDirection: "column", marginTop: "4.5px", marginRight: "2px", alignItems: "", }}>
                        <button type="button" onClick={() => addProduct(product?.pedido, product?.pedido?.cant, index)} style={{ padding: "3px 5px", width: "2rem", height: "2rem", background: "green", border: "1px solid green", cursor: "pointer", borderRadius: "4px 4px 0px 0px" }}><FontAwesomeIcon icon={faPlus} /></button>
                        <button style={{ padding: "3px 5px", width: "1.96rem", height: "1.8rem", marginTop: "2px", background: "gray", border: "1px solid gray", textAlign: "center", fontSize: "0.8rem" }}>{product?.pedido?.cant}</button>
                        {product?.pedido?.cant === 1 ? (
                           <button type="button" onClick={() => deleteProduct(product?.pedido?.idPedido)} style={{ padding: "3px 5px", marginTop: "2px", width: "2rem", height: "1.8rem", background: "orange", border: "1px solid orange", cursor: "pointer", borderRadius: "0px 0px 4px 4px" }}><FontAwesomeIcon icon={faRecycle} /></button>
                        ) : (
                           <button type="button" onClick={() => restProduct(product?.pedido, product?.pedido?.cant, index)} style={{ padding: "3px 5px", marginTop: "3px", width: "2rem", height: "1.8rem", background: "red", border: "1px solid red", cursor: "pointer", borderRadius: "0px 0px 4px 4px" }}><FontAwesomeIcon icon={faMinus} /></button>
                        )}
                     </div>
                  </li>
                  <div className='previewListCart' style={{
                     position: "absolute",
                      /* Posición fuera del elemento li */
                     top: 0,
                     width: "12rem",
                     // background: "rgba(0, 0, 0, 0.8)", /* Color de fondo del panel */
                     color: "#fff", /* Color del texto */
                     padding: "0px 10px",
                  }}>
                     <div className='preview-info-coffee'>
                        <div className='preview-notas-coffee'>
                           <h4 className='preview-title-name'>{product?.productInfo?.marca}</h4>
                           <h4 className='preview-title'>Notas - Puntaje: {product?.productInfo?.perfil?.puntaje}</h4>
                           <div style={{ padding: "1px 0px" }}>
                              {product?.productInfo?.perfil?.notas?.map((dato, index) => (
                                 <div key={index} className={`preview-notas ${dato?.d2 <= 50 && 'lower-nota-hovered'}`} style={{ width: `${dato?.d2}%`, background: "gray" }}>
                                    <p style={{ display: `${dato?.d2 <= 25 ? "none" : "block"}`, }}>{dato?.d1}</p>
                                    <p style={{ fontSize: `${dato?.d2 <= 25 ? "1.05rem" : "0.9rem"}` }}>{dato?.d2}%</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className='preview-char-coffee'>
                           <div className='preview-char'>
                              <h4 className='char-title'>Cuerpo:</h4>
                              <p className='char-des'>{product?.productInfo?.perfil?.cuerpo}</p>
                           </div>
                           <div className='preview-char'>
                              <h4 className='char-title'>Tueste:</h4>
                              <p className='char-des'>{product?.productInfo?.perfil?.tueste}</p>
                           </div>
                           <div className='preview-char'>
                              <h4 className='char-title'>Proceso:</h4>
                              <p className='char-des'>{product?.productInfo?.proceso}</p>
                           </div>
                        </div>
                        {/* <div style={{ textAlign: "", height: "100%", width: "100%", background: "red", borderRadius: "14px"  }}> */}
                        {/* hola */}
                        {/* </div> */}
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <div style={{ borderTop: "1px solid", display: "flex", alignItems: "center", paddingTop: "5px", marginTop: "2.5px" }}>
            <h3 style={{ margin: "0px 10px" }}>${formatNumPrecio(totalOfProducts)}</h3>
            <button style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer" }}>Recolectar Café</button>
         </div>
      </>
   )
}

CardCart.propTypes = {
   // productsList: PropTypes.array.isRequired
}

export {
   CardCart,
}