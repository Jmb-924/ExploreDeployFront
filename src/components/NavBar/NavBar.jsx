import PropTypes from 'prop-types'
import { faMugHot, faRightToBracket, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLinks } from './components/NavLinks'
import { PanelOpacity } from '../PanelOpacity/Opacity'
import { BoxPanel } from '../PanelOpacity/components/BoxPanel'
import { PreviewCart } from '../PreviewCart/PreviewCart'
import { useAuthContext, useCarritoContext } from '../../utils/contexts/useContext'
import { LoginLayout } from '../Login/LoginComponent'
import { deleteBd } from '../../services/api/DbConecttion/indexedDb'
import { AuthValidateToShow } from '../AuthValidate/AuthValidate'

const flexStyles = {
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center"
}

const hrStyles = {
   height: "0.1px",
   width: "1rem",
   // backgroundColor: "rgba(255, 255, 255, 0.87)",
   margin: "4px 0",
   transition: "all 0.3s ease",
   border: "0.5px solid"
}


const NavBar = ({ currentPage }) => {
   const { carrito } = useCarritoContext()
   const { user } = useAuthContext()
   // console.log(user)
   const [showLinks, setShowLinks] = useState(false)
   const [showCart, setShowCart] = useState(false)
   const [showLogin, setShowLogin] = useState(false)
   const [quantityCart, setCuantityCart] = useState(0)

   const setShow = useCallback(() => {
      setShowLinks(false)
      setShowCart(false)
      setShowLogin(false)
   }, [])

   const a = useCallback(() => {
      setCuantityCart(carrito?.length)
      // console.log("car 1:" + b)
      // console.log(carrito?.length)
   }, [carrito])

   useEffect(() => {
      a()
   }, [a])

   const ss = useCallback(() => {
      return
   }, [])


   const typeOpen = showLinks === true ? setShow : ss




   const lengthNumber = (num, length) => {
      if (num.length > length) {
         // return `${num.slice(0, length) + '...'}`
         return num.toString().slice(0, length)
      } else {
         // return `${num}`
         return num.toString()
      }
   }

   // const lengthNumber = quantityCart.length > 2 ? quantityCart.slice(0, 2) + '': quantityCart
   return (
      <>
         <div style={{ ...flexStyles, height: "100%", margin: "0px 1.8rem 0px 2.5rem" }}>
            <div style={{ ...flexStyles, border: "2px solid", borderRadius: "0.5rem", padding: "5px 6px", cursor: "pointer", }} onClick={() => setShowLinks(!showLinks)}>
               <div style={{ marginRight: "5px" }}>
                  <div style={{ ...hrStyles, transform: `${showLinks === true ? "rotate(40deg) translate(5px, 4px)" : ""}` }}></div>
                  <div style={{ ...hrStyles, transform: `${showLinks === true ? "rotate(90deg) translate(0px, -1px)" : ""}` }}></div>
                  <div style={{ ...hrStyles, transform: `${showLinks === true ? "rotate(-40deg) translate(4px, -4px)" : ""}` }}></div>
               </div>
               <div>{currentPage}</div>
            </div>
            <div style={{ position: "relative" }}>
               <FontAwesomeIcon icon={faMugHot} style={{ position: "absolute", top: "-0.8rem", height: "1.5rem" }} onClick={() => deleteBd()} />
            </div>
            <div style={{ ...flexStyles }}>
               <div style={{ ...flexStyles, marginRight: "8px", border: "2px solid", cursor: "pointer", borderRadius: "0.5rem", padding: "5px 8px", }} onClick={() => [setShowCart(!showCart), setShowLogin(false)]}>
                  <div style={{ marginRight: "4px" }}>
                     <FontAwesomeIcon icon={faShoppingBag} />
                  </div>
                  <div>
                     {lengthNumber(quantityCart, 2)}
                  </div>
               </div>
               <AuthValidateToShow secondChild={
                  <div style={{ border: "2px solid", borderRadius: "10px", padding: "5px 10px", cursor: "pointer" }} onClick={() => [setShowLogin(!showLogin), setShowCart(false)]}>
                     <div style={{ marginRight: "4px", display: "flex", alignItems: "center" }}>
                        Login
                        <FontAwesomeIcon icon={faRightToBracket} style={{ marginLeft: "5px" }} />
                     </div>
                  </div>
               }>
                  <div style={{ border: "2px solid", borderRadius: "10px", padding: "5px 10px", cursor: "pointer" }} onClick={() => [setShowLogin(!showLogin), setShowCart(false)]}>
                     <div style={{ marginRight: "4px", display: "flex", alignItems: "center" }}>
                        {user?.username}
                        <FontAwesomeIcon icon={faRightToBracket} style={{ marginLeft: "5px", transform: "rotate(90deg)" }} />
                     </div>
                  </div>
               </AuthValidateToShow>
            </div>
         </div>
         {/* <PanelOpacity open={showLinks} style={{ position: "fixed" }} changeState={typeOpen} levelOpacity={0.08}> */}
         <PanelOpacity open={showLinks || (showCart || showLogin)} style={{ position: "fixed" }} changeState={typeOpen} levelOpacity={0.08}>
            {showLinks && (

               // <BoxPanel styles={{ background: "#95949496", width: "fit-content", minWidth: "130px", maxWidth: "320px", border: "1px solid", borderRadius: "6px", marginLeft: "2.5rem", padding: "3px 7px 8px" }}>
               <BoxPanel styles={{ background: "#95949496", width: "fit-content", minWidth: "130px", border: "1px solid", borderRadius: "6px", padding: "3px 7px 8px", left: "2.5rem", position: "absolute" }}>
                  <NavLinks />
               </BoxPanel>
            )}
            {showCart && (
               <BoxPanel styles={{ background: "#6F4E37", minWidth: "130px", border: "1px solid", borderRadius: "6px", padding: "3px 7px 8px", right: "2.3rem", position: "absolute" }}>
                  <PreviewCart closeCart={setShow} />
               </BoxPanel>
            )}
            {showLogin && (
               <BoxPanel styles={{ background: "black", minWidth: "130px", border: "1px solid", borderRadius: "6px", padding: "3px 7px 8px", right: "2.3rem", position: "absolute" }}>
                  <LoginLayout closeLogin={setShow} />
               </BoxPanel>
            )}
         </PanelOpacity>
         {/* <PanelOpacity open={showCart} style={{ position: "fixed" }} changeState={ss} levelOpacity={0.08}>
            {showCart && (
               <BoxPanel styles={{ background: "#6F4E37", minWidth: "130px", border: "1px solid", borderRadius: "6px", padding: "3px 7px 8px", right: "2.3rem", position: "absolute" }}>
                  <PreviewCart closeCart={setShow} products={productsInCart} />
               </BoxPanel>
            )}
         </PanelOpacity> */}
         {/* <PanelOpacity open={showCart} changeState={setShowCart} style={{  }} levelOpacity={0.08}>
         </PanelOpacity> */}
      </>
   )
}

NavBar.propTypes = {
   currentPage: PropTypes.string.isRequired
}

export {
   NavBar,
}