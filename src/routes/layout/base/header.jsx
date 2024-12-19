import PropTypes from 'prop-types'
import { useState } from 'react'

const Header = ({ changeBg, changeHeight, children }) => {
   const [bg, setBg] = useState(false)
   const changeBackground = () => {
      if (window.scrollY >= 203) {
         setBg(true)
      } else {
         setBg(false)
      }
   }

   window.addEventListener("scroll", changeBackground)
   return (
      <div id="header" className={`${bg && changeBg ? 'bg-change' : ''} ${bg && changeHeight ? 'h-change' : ''}`}>
         {children}
      </div>
   )
}

Header.propTypes = {
   changeBg: PropTypes.bool,
   changeHeight: PropTypes.bool,
   children: PropTypes.node.isRequired
}

export default Header