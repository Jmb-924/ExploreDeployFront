export const openDb = () => {
   return new Promise((resolve, reject) => {
      var db;
      var request = indexedDB.open('aroma_db_indexed', 1)

      request.onupgradeneeded = (event) => {
         db = event.target.result
         var productsBuy = db.createObjectStore('carrito_productos', { keyPath: 'idPedido', autoIncrement: true })
         productsBuy.createIndex('id', 'id', { unique: false })
         productsBuy.createIndex('idBag', 'idBag', { unique: false })
         productsBuy.createIndex('idMol', 'idMol', { unique: false })
         productsBuy.createIndex('cant', 'cant', { unique: false })
         productsBuy.createIndex('total', 'total', { unique: false })
         productsBuy.createIndex('precio', 'precio', { unique: false })

         var userAuthSave = db.createObjectStore('user_auth', { keyPath: 'id', autoIncrement: true })
         userAuthSave.createIndex('userId', 'userId')
         userAuthSave.createIndex('userInfo', 'userInfo')
         userAuthSave.createIndex('expiredTime', 'expiredTime')
      }

      request.onsuccess = (event) => {
         resolve(event.target.result);
      };

      request.onerror = (event) => {
         reject("Error al abrir la base de datos: " + event.target.error);
      };
   })
}

export const deleteBd = () => {
   indexedDB.deleteDatabase('aroma_db_indexed');
}
