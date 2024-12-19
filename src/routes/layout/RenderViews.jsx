import PropTypes from 'prop-types'
import Header from './base/header'
import { NavBar } from '../../components'
import Main from './base/main'
import { Footer } from './base/footer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const RenderView = ({ titlePage, currentPage, bg, h, foot, children }) => {
   const location = useLocation()
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [location])
   return (
      <>
         <title>{titlePage}</title>
         <Header changeBg={bg} changeHeight={h}>
            <NavBar currentPage={currentPage} />
         </Header>
         <Main>
            {children}
            {/* <ComponentWrapper component={children} /> */}
         </Main>
         {foot && (
            <Footer />
         )}
         {/* <div id="footer">Footer</div> */}
      </>
   )
}

RenderView.propTypes = {
   titlePage: PropTypes.string.isRequired,
   currentPage: PropTypes.string.isRequired,
   bg: PropTypes.bool,
   h: PropTypes.bool,
   foot: PropTypes.bool,
   children: PropTypes.node.isRequired
}

export default RenderView

const ComponentWrapper = ({ component }) => {
   const Component = component
    return <Component />
    
 }
 
 ComponentWrapper.propTypes = {
    component: PropTypes.node
 }
