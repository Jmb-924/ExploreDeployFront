const apiUrl = import.meta.env.VITE_API_URL

const DeleteMethod = async (endPoint, id) => {
  try {
    const res = await fetch(`${apiUrl}${endPoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    return console.log(error)
  }
}

const DeleteMethodSecured = async (endPoint, token, id) => {
   try {
     const res = await fetch(`${apiUrl}${endPoint}/${id}`, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         'authorization': `Bearer ${token}`
       }
     })
     if (!res.ok) {
       throw new Error(`Error: ${res.status}`)
     }
     return await res.json()
   } catch (error) {
     return console.log(error)
   }
 }


 export {
   DeleteMethod,
   DeleteMethodSecured
 }