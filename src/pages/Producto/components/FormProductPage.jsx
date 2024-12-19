import PropTypes from 'prop-types'
import { useMemo, useState } from 'react';
import { agregarAlCarrito } from '../../../services/api/IndexedDb/Create/Carrito';
import { useCarritoContext } from '../../../utils/contexts/useContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatNumPrecio } from '../../../utils/helpers/NumFormat';
import './css/FormProductPage.css'

const FormProductView = ({ product, bag, id }) => {
   const { addToCarrito, updateToCarrito } = useCarritoContext()
   // Estado para almacenar la información de la bolsa de café seleccionada
   const [selectedBag, setSelectedBag] = useState(null);
   // const [indexBag, setIndexBag] = useState(null)
   const valBagSelect = selectedBag === null
   const [formData, setFormData] = useState({
      id: id,
      idBag: 0,
      idMol: 0,
      cant: 1,
      total: 0,
      precio: 0,
   })


   const calculateTotalBag = useMemo(() => {
      var precio = !selectedBag ? 0 : selectedBag?.precio
      var calculate = precio * formData.cant
      return calculate
   }, [selectedBag, formData])


   const submitForm = async (e) => {
      e.preventDefault()
      formData.id = id
      formData.total = calculateTotalBag
      formData.precio = selectedBag?.precio
      console.log(formData)
      await agregarAlCarrito(formData).then(async (res) => {
         if (res.status === 200) {
            updateToCarrito()
            alert(`${res?.type} ${res?.status} - ${res?.mensaje}`)
            clearData()
         } else if (res.status === 201) {
            addToCarrito(formData)
            alert(`${res?.type} ${res?.status} - ${res?.mensaje}`)
            clearData()
         }
      }).catch(error => console.log(error))
      // console.log(formData)
      // clearData()
   }

   const clearData = () => {
      setFormData({
         id: id,
         idBag: 0,
         idMol: 0,
         cant: 1,
         total: 0,
         precio: 0
      })
      setSelectedBag(product.bags[0])
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

   const [bagActive, setBagActive] = useState({ active: false, who: 0 })
   const [molActive, setMolActive] = useState({ active: true, who: 0 })
   return (
      <>
         <div className='form-product-page'>
            <div className='select-bag-product-page'>
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
            <div className={`select-mol-product-page ${!selectedBag ? "disabled" : ""}`}>
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
            <div className={`select-cant-product-page ${!selectedBag ? "disabled" : ""}`}>
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
               <div className="disabled-cape"></div>
            </div>
            <div className='total-product-page'>
               <div className="action">
                  {valBagSelect ? (
                     <button className="cart-button" type='button' disabled>
                        <FontAwesomeIcon icon={faBagShopping} />
                        <span>Selecciona la Bolsa</span>
                     </button>
                  ) : (
                     <button className="cart-button" type='button' onClick={submitForm}>
                        <FontAwesomeIcon icon={faBagShopping} />
                        <span>Añadir al Costal</span>
                     </button>
                  )}
               </div>
            </div>
            {/* <div className="size"> */}
            {/* <span>Size</span> */}
            {/* </div> */}
         </div>
      </>
   )
}

FormProductView.propTypes = {
   product: PropTypes.object,
   bag: PropTypes.array,
   id: PropTypes.any
   // children: PropTypes.node
}

export {
   FormProductView,
}