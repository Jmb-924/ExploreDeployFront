import { openDb } from "../../DbConecttion/indexedDb"

export const createAuthorization = async (userAuth) => {
   await openDb().then(db => {
      var connect = db.transaction(['user_auth'], 'readwrite')
      var create = connect.objectStore('user_auth')
      var req = create.add(userAuth)

      req.onsuccess = () => {
         // refreshAction()
         // console.log("Logueado");
      };
   
      req.onerror = (event) => {
         console.log("Error al ingresar:", event.target.error);
      };
   }).catch(error => {
      console.error(error)
   })
}
