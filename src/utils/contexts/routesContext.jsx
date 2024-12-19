import { createContext } from "react";
import PropTypes from 'prop-types'

export const DataRouterContext = createContext()

export const RouterContext = ({ value, children }) => {
   return (
      <DataRouterContext.Provider value={value}>
         {children}
      </DataRouterContext.Provider>
   )
}

RouterContext.propTypes = {
   value: PropTypes.arrayOf(
      PropTypes.shape({
         title: PropTypes.string.isRequired,
         path: PropTypes.string.isRequired,
         navigationBar: PropTypes.shape({
            navTitle: PropTypes.string.isRequired,
            icon: PropTypes.any
         }),
         headerStyle: PropTypes.shape({
            changeBg: PropTypes.bool,
            changeHeight: PropTypes.bool
         }),
         foot: PropTypes.bool,
         auth: PropTypes.bool,
         component: PropTypes.elementType.isRequired,
      }),
   ).isRequired,
   children: PropTypes.node.isRequired
}