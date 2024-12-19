import { openDb } from "../../DbConecttion/indexedDb";

export const obtenerAuthorization = () => {
   return new Promise((resolve, reject) => {
       openDb().then(db => {
           var connect = db.transaction(['user_auth'], 'readonly');
           var getAuthUser = connect.objectStore('user_auth');
           var req = getAuthUser.getAll();

           req.onsuccess = () => {
               resolve(req.result);
           };

           req.onerror = (event) => {
               reject("Error al obtener el acceso: " + event.target.error);
           };
       }).catch(error => {
           reject(error);
       });
   });
};
