import { openDb } from "../../DbConecttion/indexedDb";

export const agregarAlCarrito = async (producto) => {
   return new Promise((resolve, reject) => {
      openDb().then(db => {
         try {
            var connect = db.transaction(['carrito_productos'], 'readonly');
            var store = connect.objectStore('carrito_productos');

            // Crear un cursor para buscar el producto con los mismos id, idBag e idMol
            var indexId = store.index('id');
            store.index('idBag');
            store.index('idMol');

            var foundProduct = null;

            indexId.openCursor().onsuccess = (event) => {
               var cursor = event.target.result;
               if (cursor) {
                  if (cursor.value.id === producto.id && cursor.value.idBag === producto.idBag && cursor.value.idMol === producto.idMol) {
                     foundProduct = cursor.value;
                  }
                  cursor.continue();
               } else {
                  // Después de buscar, realizar la operación de agregar o actualizar
                  var connectWrite = db.transaction(['carrito_productos'], 'readwrite');
                  var create = connectWrite.objectStore('carrito_productos');

                  if (foundProduct) {
                     // Actualizar el producto existente
                     foundProduct.cant += producto.cant;
                     foundProduct.total += producto.total;

                     var reqUpdate = create.put(foundProduct);

                     reqUpdate.onsuccess = () => {
                        // console.log("Producto actualizado con éxito");
                        resolve({ mensaje: 'Producto actualizado con éxito', status: 200, type: 'Success:', })
                     };

                     reqUpdate.onerror = (event) => {
                        console.log("Error al actualizar el producto:", event.target.error);
                        resolve({ mensaje: `Error al actualizar el producto: ${event.target.error}`, status: 400, type: 'Error:', })
                     };
                  } else {
                     // Agregar el nuevo producto
                     var reqAdd = create.add(producto);

                     reqAdd.onsuccess = () => {
                        // console.log("Producto agregado con éxito");
                        resolve({ mensaje: 'Producto agregado con éxito', status: 201, type: 'Success:', })
                     };

                     reqAdd.onerror = (event) => {
                        // console.log("Error al agregar el producto:", event.target.error);
                        reject({ mensaje: `Error al agregar el producto: ${event.target.error}`, status: 400, type: 'Error:', })
                     };
                  }
               }
            };

            indexId.openCursor().onerror = (event) => {
               console.log("Error al buscar el producto:", event.target.error);
            };
         } catch (error) {
            console.error(error);
         }
      })
   })
};


export const eliminarTodosLosProductosDelCarrito = () => {
   return new Promise((resolve, reject) => {
      openDb().then(db => {
         var transaction = db.transaction(['carrito_productos'], 'readwrite');
         var objectStore = transaction.objectStore('carrito_productos');
         var request = objectStore.clear();

         request.onsuccess = () => {
            resolve("Todos los productos del carrito fueron eliminados correctamente");
         };

         request.onerror = (event) => {
            reject("Error al eliminar todos los productos del carrito: " + event.target.error);
         };
      }).catch(error => {
         reject(error);
      });
   });
};