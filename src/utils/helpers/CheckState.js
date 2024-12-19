function CheckStateUser(state) {
   let type = ''
   switch (state) {
      case 0:
         type = 'Inactivo'
         break;
      case 1:
         type = 'Activo'
         break;
      case 2:
         type = 'En Proceso'
         break;
      case 3:
         type = 'Tienda'
         break;
      default:
         break;
   }
   return type
}

export {
   CheckStateUser
}