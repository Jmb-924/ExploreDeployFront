const DataToStringImgArray = (producto) => {
   const productoConImages = producto?.imgs?.map(img => {
      console.log(img);
      
      return {
         // ...img,
         data: btoa(new Uint8Array(img?.data?.data).reduce((data, bite) => data + String.fromCharCode(bite), '')),
         contentType: img?.contentType
      }
   })
   return {
      ...producto,
      imgs: productoConImages
   }
}

export {
   DataToStringImgArray
}