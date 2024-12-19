import PropTypes from 'prop-types'

const Footer = ({ children }) => {
   return (
      <footer id='footer'>
         <div style={{ display: "flex", justifyContent: "start", alignItems: "start" }}>
            <div>
               <div id="mapa">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15879.77874377896!2d-75.616197!3d6.1514513!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4683f58f9e54dd%3A0xf9a731a4ecdcc49f!2sAroma%20Caf%C3%A9%20Sabaneta!5e0!3m2!1sen!2sus!4v1649322071029!5m2!1sen!2sus" width="550" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
               </div>
               <div style={{ display: "flex", justifyContent: "start", alignItems: "center", color: "gray", }}>
                  <h2 style={{ margin: "0px", fontSize: "1.15rem" }}>Lugar:</h2><p style={{ margin: "2px 0px 0px 5px", fontSize: "1rem" }}>Cl. 68 Sur #43 A 60, Sabaneta, Antioquia</p>
               </div>
            </div>
            <div style={{ marginLeft: "3rem", color: "gray" }}>
               <h2 style={{ margin: "0px", fontSize: "1.25rem" }}>Contacto</h2>
               {/* <p></p> */}
               <p style={{ margin: "8px 0px", fontSize: "1rem" }}>Teléfono: 316-609-3889</p>
               <p style={{ margin: "8px 0px", fontSize: "1rem" }}>Correo: aromacafesabaneta@gmail.com</p>
               <br />
               <h2 style={{ margin: "0px", fontSize: "1.25rem" }}>Developers</h2>
               <p style={{ margin: "8px 0px", fontSize: "1rem" }}>Teléfono: 302-719-4139</p>
               <p style={{ margin: "8px 0px", fontSize: "1rem" }}>Correo: jmb11082004@gmail.com</p>
            </div>
            <div style={{ marginLeft: "3rem", color: "gray" }}>
               <h2 style={{ margin: "0px", fontSize: "1.25rem" }}>Redes Sociales</h2>
               <p style={{ margin: "8px 0px", fontSize: "1rem" }}>Instagram: @aromacafesabaneta</p>
               <p style={{ margin: "8px 0px", fontSize: "1rem" }}>Facebook: Aroma Café Sabaneta</p>
               <p style={{ margin: "8px 0px", fontSize: "1rem" }}>WhatsApp: +573166093889</p>
            </div>
         </div>

         {/* <!-- Aquí va el mapa --> */}


         {/* <p>&copy; 2024 Mi Sitio Web</p> */}
      </footer>
   )
}

Footer.propTypes = {
   children: PropTypes.node
}

export {
   Footer,
}