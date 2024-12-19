export function ReplaceSpaceTo(dato, replace) {
   if (!dato.includes(' ')) {
      return dato
   }
   return dato.replace(/ /g, replace)
}