import { openDb } from "../../DbConecttion/indexedDb";

export const deleteProductFromCart = async (idPedido) => {
   await openDb().then(db => {
      const connect = db.transaction(["carrito_productos"], "readwrite")
      const deleteP = connect.objectStore("carrito_productos")

      const deleteReq = deleteP.delete(idPedido)

      deleteReq.onsuccess = () => {
         // console.log("Producto eliminado con éxito");
      };

      deleteReq.onerror = (event) => {
         console.error("Error al eliminar el producto:", event.target.error);
      };
   }).catch(error => {
      console.error("Error al abrir la base de datos:", error);
   })
};
