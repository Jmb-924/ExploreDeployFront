import PropTypes from 'prop-types'
import './css/index.css'
import { useAlertContext } from '../../utils/contexts/useContext'

const Alerts = ({ msg, showAlert, classes }) => {
   const { hideAlert } = useAlertContext()
   setTimeout(() => {
      hideAlert()
   }, 5000);
   return (
      <>
         <div className={`alert ${showAlert === true ? `${classes}` : 'hide'}`}>
            <div className='content-alert'>
               <h1 className='status'>{msg.status}</h1>
               <p className='msg'><strong>{msg.type}</strong> {msg.mensaje}</p>
            </div>
         </div>
      </>
   )
}

Alerts.propTypes = {
   msg: PropTypes.object,
   showAlert: PropTypes.bool,
   classes: PropTypes.string,
   // children: PropTypes.node
}

export {
   Alerts,
}