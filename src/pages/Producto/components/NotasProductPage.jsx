import PropTypes from 'prop-types'
import './css/NotasProductPage.css'

const NotasProductView = ({ product }) => {
   return (
      <>
      <div className="preview-info-coffee-page">   
         <div className='preview-notas-coffee-page'>
            {product?.perfil?.notas?.map((dato, index) => (
               <div key={index} className={`preview-notas-page ${dato?.d2 <= 90 && 'lower-nota-hovered-page'}`} style={{ width: `${dato?.d2}%`, background: "gray" }}>
                  <p style={{ display: `${dato?.d2 <= 25 ? "none" : "block"}`, }}>{dato?.d1}</p>
                  <p style={{ fontSize: `${dato?.d2 <= 25 ? "1.05rem" : "0.9rem"}` }}>{dato?.d2}%</p>
               </div>
            ))}
         </div>
      </div>
      </>
   )
}

NotasProductView.propTypes = {
   product: PropTypes.object,
   // children: PropTypes.node
}

export {
   NotasProductView,
}