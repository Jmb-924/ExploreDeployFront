import PropTypes from 'prop-types'

const BoxContainer = ({ children, styles, classes }) => {
   return (
      <div style={{ ...styles}} className={classes}>
         {children}
      </div>
   )
}

BoxContainer.propTypes = {
   styles: PropTypes.object,
   classes: PropTypes.string,
   children: PropTypes.node
}

export {
   BoxContainer,
}