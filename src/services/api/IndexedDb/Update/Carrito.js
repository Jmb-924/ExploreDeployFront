import { openDb } from "../../DbConecttion/indexedDb";

export const updateProductInCart = async (updatedProduct) => {
   await openDb().then(async db => {
      var connect = db.transaction(["carrito_productos"], 'readwrite')
      var productUpdate = connect.objectStore("carrito_productos")

      var getReq = await productUpdate.get(updatedProduct.idPedido)

      getReq.onsuccess = async (event) => {
         var product = event.target.result

         if (product) {
            product.idBag = updatedProduct.idBag;
            product.idMol = updatedProduct.idMol;
            product.cant = updatedProduct.cant;
            product.total = updatedProduct.total;
            product.precio = updatedProduct.precio;

            var update = await productUpdate.put(product)

            update.onsuccess = () => {
               // console.log("Producto actualizado con éxito");
            };

            update.onerror = (event) => {
               console.log("Error al actualizar el producto: " + event.target.error);
            };
         } else {
            console.log("El producto no existe en la base de datos");
         }
      }

      getReq.onerror = (event) => {
         console.log("Error al obtener el producto de la base de datos: " + event.target.error);
      };
   }).catch(error => {
      console.error(error)
   })
}
