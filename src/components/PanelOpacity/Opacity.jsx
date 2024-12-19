import PropTypes from 'prop-types'

const PanelOpacity = ({ open, changeState, levelOpacity, style, children }) => {
   return (
      <div style={{ ...style, height: "100vh", width: "100vw", background: `rgba(255, 255, 255, ${levelOpacity})`, display: `${open === true ? "block" : "none"}`, opacity: `${open === true ? "1" : "0"}`, paddingTop: "8px", transition: "all 0.3s ease",  }} onClick={() => changeState !== null ? changeState() : undefined }>
         {children}
      </div>
   )
}

PanelOpacity.propTypes = {
   open: PropTypes.bool.isRequired,
   changeState: PropTypes.any,
   levelOpacity: PropTypes.number.isRequired,
   style: PropTypes.object,
   children: PropTypes.node
}

export {
   PanelOpacity,
}