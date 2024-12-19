function CheckRolUser(rol) {
   let type = ''
   switch (rol) {
      case '4dm1n':
         type = 'Administrador'
         break;
      case 'u5u4r10':
         type = 'Usuario'
         break;
      case 't13nd4':
         type = 'Tienda'
         break;
      default:
         break;
   }
   return type
}

export {
   CheckRolUser
}