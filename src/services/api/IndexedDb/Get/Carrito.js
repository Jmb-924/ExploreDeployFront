import { openDb } from "../../DbConecttion/indexedDb";

export const obtenerCarrito = () => {
   return new Promise((resolve, reject) => {
       openDb().then(db => {
           var connect = db.transaction(['carrito_productos'], 'readonly');
           var getListProductsCart = connect.objectStore('carrito_productos');
           var req = getListProductsCart.getAll();
            // console.log(req.result)
           req.onsuccess = () => {
               resolve(req.result);
           };

           req.onerror = (event) => {
               reject("Error al obtener los productos del carrito: " + event.target.error);
           };
       }).catch(error => {
           reject(error);
       });
   });
};
