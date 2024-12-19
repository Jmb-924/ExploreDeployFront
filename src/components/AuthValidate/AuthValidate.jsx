import PropTypes from 'prop-types'
import { useAuthContext } from '../../utils/contexts/useContext'

const AuthValidateToShow = ({ children, secondChild }) => {
   const { userAuth } = useAuthContext()

   if (userAuth !== null) {
      return (
         <>{children}</>
      )
   }

   if (userAuth === null && secondChild) {
      return (
         <>{secondChild}</>
      )   
   }
   return (
      <></>
   )
}

AuthValidateToShow.propTypes = {
   children: PropTypes.node,
   secondChild: PropTypes.node
}

export {
   AuthValidateToShow,
}