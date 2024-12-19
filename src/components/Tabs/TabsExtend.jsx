import PropTypes from 'prop-types'
import './css/tabExtend.css'
import { useEffect, useState } from 'react'

const TabsExtend = ({ children, headers }) => {
   const [tabSelected, setTabSelected] = useState(null)

   useEffect(() => {
      if (tabSelected === null) {
         setTabSelected(0)
      }
   }, [tabSelected])

   return (
      <div className='tabs-ex'>
         <div className='headers-tabs-ex'>
            {headers.map((item, index) => (
               <h3 className={`header-ex ${tabSelected === index ? 'active-header-ex' : 'inactive-header-ex'}`} key={index} onClick={() => setTabSelected(index)}>{item}</h3>
            ))}
         </div>
         <div className={`children-tabs-ex ${tabSelected !== 0 ? 'active-r-ex' : ''}`}>
            {Array.isArray(children) ? children.map((child, index) => (
               <div className={`contenedor-child-ex ${tabSelected === index ? 'active-child-ex' : 'inactive-child-ex'}`} key={index} >
                  {child}
               </div>
            )) : (
               // <div className={`contenedor-child active-child`} >
               //    {children}
               // </div>
               <div className='contenedor-child-ex active-child-ex empty-ex'>
                  <h2>Sin contenido seleccionado</h2>
               </div>
            )}
            {Array.isArray(children) && (children[tabSelected] === null) && (
               <div className='contenedor-child-ex empty-ex'>
                  <h2>Sin contenido seleccionado</h2>
               </div>
            )}
         </div>
      </div>
   )
}

TabsExtend.propTypes = {
   headers: PropTypes.array,
   children: PropTypes.node
}

export {
   TabsExtend,
}