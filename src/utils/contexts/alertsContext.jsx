import { createContext, useState } from "react";
import PropTypes from 'prop-types'
import { typesAlerts } from "../../components/Alert/types/typesAlert";
import { Alerts } from "../../components/Alert/Alert";

export const DataAlertContext = createContext()

export const AlertContext = ({ children }) => {
   const [msgAlert, setMsgAlert] = useState({
      mensaje: '',
      status: null,
      type: ''
   })
   const [showAlert, setShowAlert] = useState(false)
   const alertClass = typesAlerts[msgAlert.type]?.classes

   const hideAlert = () => {
      setMsgAlert({
         mensaje: '',
         status: null,
         type: ''
      })
      setShowAlert(false)
   }
   return (
      <DataAlertContext.Provider value={{ setMsgAlert, setShowAlert, hideAlert }}>
         <Alerts msg={msgAlert} showAlert={showAlert} classes={alertClass} />
         {children}
      </DataAlertContext.Provider>
   )
}

AlertContext.propTypes = {
   children: PropTypes.node.isRequired
}