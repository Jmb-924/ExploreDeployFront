import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext, useRoutesContext } from "../../../utils/contexts/useContext.js"

const NavLinks = () => {
   const links = useRoutesContext()
   const { userAuth } = useAuthContext()
   const location = useLocation()

   return (
      <>
         {links.map((link, index) => {
            if (link.navigationBar && !link.auth) {
               return (
                  <Link key={index} to={`${link.path}`} style={{ textDecoration: "none", color: "currentcolor" }}>
                     <div style={{ display: "flex", background: "", borderRadius: "6px", padding: "5px 6px", marginTop: "5px" }}>
                        <div style={{ marginRight: "8px" }}>
                           <FontAwesomeIcon icon={link.navigationBar.icon} />
                        </div>
                        <div style={{ fontWeight: `${location.pathname === link.path ? "bold" : ""}` }}>{link.navigationBar.navTitle}</div>
                     </div>
                  </Link>
               )
            }
            if (link.navigationBar && link.auth && userAuth) {
               return (
                  <Link key={index} to={`${link.path}`} style={{ textDecoration: "none", color: "currentcolor" }}>
                     <div style={{ display: "flex", background: "", borderRadius: "6px", padding: "5px 6px", marginTop: "5px" }}>
                        <div style={{ marginRight: "8px" }}>
                           <FontAwesomeIcon icon={link.navigationBar.icon} />
                        </div>
                        <div style={{ fontWeight: `${location.pathname === link.path ? "bold" : ""}` }}>{link.navigationBar.navTitle}</div>
                     </div>
                  </Link>
               )
            }
         })}
      </>
   )
}

NavLinks.propTypes = {
   // children: PropTypes.node
}

export {
   NavLinks,
}