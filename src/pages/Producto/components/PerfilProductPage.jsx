import PropTypes from 'prop-types'
import './css/PerfilProductPage.css'

const PerfilProductView = ({ product }) => {
   return (
      <>
         <div className="preview-info-coffee-perfil">
            <div className='preview-char-coffee-perfil'>
               <div className="preview-char-perfil">
                  <h4 className="char-title-perfil">Origen:</h4>
                  <p className="char-des-perfil">{product?.origen}</p>
               </div>
               <div className="preview-char-perfil">
                  <h4 className="char-title-perfil">Altura:</h4>
                  <p className="char-des-perfil">{product?.altura}m.s.n.m</p>
               </div>
               <div className='preview-char-perfil'>
                  <h4 className='char-title-perfil'>Tueste:</h4>
                  <p className='char-des-perfil'>{product?.perfil?.tueste}</p>
               </div>
               <div className="preview-char-perfil">
                  <h4 className="char-title-perfil">Variedad:</h4>
                  <p className="char-des-perfil">{product?.variedad}</p>
               </div>
               <div className='preview-char-perfil'>
                  <h4 className='char-title-perfil'>Proceso:</h4>
                  <p className='char-des-perfil'>{product?.proceso}</p>
               </div>
               <div className='preview-char-perfil'>
                  <h4 className='char-title-perfil'>Cuerpo:</h4>
                  <p className='char-des-perfil'>{product?.perfil?.cuerpo}</p>
               </div>
               <div className="preview-char-perfil">
                  <h4 className="char-title-perfil">Productor:</h4>
                  <p className="char-des-perfil">{product?.productor}</p>
               </div>
            </div>
         </div>
      </>
   )
}

PerfilProductView.propTypes = {
   product: PropTypes.object,
   // children: PropTypes.node
}

export {
   PerfilProductView,
}