import PropTypes from 'prop-types'
import './css/index.css'
import { useEffect, useState } from 'react'

const Tabs = ({ children, headers }) => {
   const [tabSelected, setTabSelected] = useState(null)

   useEffect(() => {
      if (tabSelected === null) {
         setTabSelected(2)
      }
   }, [tabSelected])

   return (
      <div className='tabs'>
         <div className='headers-tabs'>
            {headers.map((item, index) => (
               <h3 className={`header ${tabSelected === index ? 'active-header' : 'inactive-header'}`} key={index} onClick={() => setTabSelected(index)}>{item}</h3>
            ))}
         </div>
         <div className={`children-tabs ${tabSelected !== 0 ? 'active-r' : ''}`}>
            {Array.isArray(children) ? children.map((child, index) => (
               <div className={`contenedor-child ${tabSelected === index ? 'active-child' : 'inactive-child'}`} key={index} >
                  {child}
               </div>
            )) : (
               // <div className={`contenedor-child active-child`} >
               //    {children}
               // </div>
               <div className='contenedor-child active-child empty'>
                  <h2>Sin contenido seleccionado</h2>
               </div>
            )}
            {Array.isArray(children) && (children[tabSelected] === null) && (
               <div className='contenedor-child empty'>
                  <h2>Sin contenido seleccionado</h2>
               </div>
            )}
         </div>
      </div>
   )
}

Tabs.propTypes = {
   headers: PropTypes.array,
   children: PropTypes.node
}

export {
   Tabs,
}