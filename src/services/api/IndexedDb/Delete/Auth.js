import { openDb } from "../../DbConecttion/indexedDb";

export const deleteAuthorization = async (idAuth) => {
   await openDb().then(db => {
      const connect = db.transaction(["user_auth"], "readwrite")
      const deleteA = connect.objectStore("user_auth")

      const deleteReq = deleteA.delete(idAuth)

      deleteReq.onsuccess = () => {
         // console.log("Acceso eliminado con éxito");
      };

      deleteReq.onerror = (event) => {
         console.error("Error al eliminar el acceso:", event.target.error);
      };
   }).catch(error => {
      console.error("Error al abrir la base de datos:", error);
   })
};