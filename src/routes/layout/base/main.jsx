import PropTypes from 'prop-types'

const Main = ({ children }) => {
   return (
      <div id="main">
         {children}
      </div>
   )
}

Main.propTypes = {
   children: PropTypes.node.isRequired
}

export default Main