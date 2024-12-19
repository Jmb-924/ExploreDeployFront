// import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardCart } from './components/CardCart'
import { faCartPlus, faClose } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { useCarritoContext } from '../../utils/contexts/useContext'

const PreviewCart = ({ closeCart }) => {
   const { carrito } = useCarritoContext()
   return (
      <>
         <div style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 8px", fontSize: "1.3rem", fontWeight: "revert-layer", borderBottom: "1px solid", zIndex: "2" }}>
            <p style={{ fontSize: "1.3rem", margin: "3px 0px", padding: "0px", fontWeight: "600" }}>Costal de Café</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
               <FontAwesomeIcon icon={faClose} style={{ cursor: "pointer", fontSize: "1.6rem", }} onClickCapture={() => closeCart()} />
               {/* <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer", fontSize: "1rem", }} onClick={eliminarTodosLosProductosDelCarrito}  /> */}
            </div>
         </div>
         {carrito?.length >= 1 ? (
            <CardCart />
         ) : (
            <div style={{ width: "324px", padding: "5px 4px", alignItems: "stretch" }}>
               <div style={{ width: "100%", textAlign: "center", display: 'flex', flexDirection: "column", alignItems: "center", marginBottom: "5px" }}>
                  <FontAwesomeIcon icon={faCartPlus} style={{ width: "2rem", height: "2rem", }} />
                  ¡Tienes Café por Recolectar!
               </div>
               <Link to="/Coffee/List">
                  <button onClick={() => closeCart()} style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer" }}>Ir a la Cosecha</button>
               </Link>
            </div>
         )}
      </>
   )
}

PreviewCart.propTypes = {
   closeCart: PropTypes.any,
   // products: PropTypes.array
}

export {
   PreviewCart,
}