import PropTypes from 'prop-types'

const BoxPanel = ({ children, styles, }) => {
   return (
      <div style={{ ...styles }}>
         {children}
      </div>
   )
}

BoxPanel.propTypes = {
   styles: PropTypes.object,
   children: PropTypes.node
}

export {
   BoxPanel,
}