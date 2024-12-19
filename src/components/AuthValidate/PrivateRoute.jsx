import PropTypes from 'prop-types'
import { useAuthContext } from '../../utils/contexts/useContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
   const { userAuth } = useAuthContext()
   return userAuth ? children : <Navigate to={'/'} />
}

PrivateRoute.propTypes = {
   children: PropTypes.node
}

export {
   PrivateRoute,
}