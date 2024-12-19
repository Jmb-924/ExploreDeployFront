import { GetMethod } from "../../services/api/MongoDb/GetMethod"

const CountReviewsProduct = async (idProduct) => {
   const a = await GetMethod(`/productos/reviews/producto/${idProduct}`)
   let starsI = 0
   let length = 0
   let starsT = 0
   if (a.length > 0) {
      length = a.length
      a.forEach(item => {
         starsI += item?.stars
      });
      starsT = starsI / length
   } else {
      starsT = 5
   }
   return Math.round(starsT)
}

const CountReviewsProduct2 = async (reviews) => {
   // const a = await GetMethod(`/productos/reviews/producto/${idProduct}`)
   let starsI = 0
   let length = 0
   let starsT = 0
   if (reviews.length > 0) {
      length = reviews.length
      reviews.forEach(item => {
         starsI += item?.stars
      });
      starsT = starsI / length
   } else {
      starsT = 5
   }
   // console.log(starsT)
   return Math.round(starsT)
}

export {
   CountReviewsProduct,
   CountReviewsProduct2
}