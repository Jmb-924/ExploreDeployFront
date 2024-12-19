import { format } from 'date-fns';
import { es } from 'date-fns/locale';


const formatCommentCreateDate = () => {
   const date = new Date()
   const formatDate = format(date, "EEEE, d 'de' MMMM 'a las' h:mmaaa", { locale: es })

   return formatDate
}

const formatCommentUpdateDate = () => {
   const date = new Date()
   const formatDate = format(date, "'Actualizado:' EEEE, d 'de' MMMM 'a las' h:mmaaa", { locale: es })

   return formatDate
}


export {
   formatCommentCreateDate,
   formatCommentUpdateDate
}