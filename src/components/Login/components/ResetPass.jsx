import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

const ResetPassword = ({ sectionUse, setLoginSection }) => {
   return (
      <>
         <div style={{ width: "230px", padding: "5px 10px", }}>
            <form style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "start", marginBottom: "5px" }}>
               <div className="input-form">
                  <label htmlFor="email">Correo de Recuperacion:</label>
                  <input type="email" name="correo" id="email" required />
               </div>


               <button style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer", margin: "8px 0px 4px" }}>Enviar Correo</button>
               <p style={{ cursor: "pointer", margin: "6px 5px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[1])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sin Cuenta? Registrate Gratis Aqui</p>
               <p style={{ cursor: "pointer", margin: "6px 5px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[0])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Inicio de Sesion</p>
               {/* <p style={{ cursor: "pointer", margin: "6px 5px 0px", padding: "0px", fontSize: "0.85rem", fontWeight: "lighter", borderBottom: "1px solid" }} onClick={() => setLoginSection(sectionUse[2])}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Olvidaste la Contraseña?</p> */}
            </form>
         </div>
      </>
   )
}

ResetPassword.propTypes = {
   sectionUse: PropTypes.array,
   setLoginSection: PropTypes.any
}

export {
   ResetPassword,
}