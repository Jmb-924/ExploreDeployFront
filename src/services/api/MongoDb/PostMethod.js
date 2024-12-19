const apiUrl = import.meta.env.VITE_API_URL

const postMethod = async (endPoint, formData) => {
   try {
      const res = await fetch(`${apiUrl}${endPoint}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
      })
      if (!res.ok) {
         throw new Error(`Error: ${res.status}`);
      }
      return await res.json()
   } catch (error) {
      return console.log(error)

   }
}

const postMethodSecured = async (endPoint, token, formData) => {
   try {
      const res = await fetch(`${apiUrl}${endPoint}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
         },
         body: JSON.stringify(formData)
      })
      if (!res.ok) {
         throw new Error(`Error: ${res.status}`);
      }
      return await res.json()
   } catch (error) {
      return console.log(error)
   }
}

const postSecuredNotJson = async (endPoint, token, formData) => {
   try {
      const res = await fetch(`${apiUrl}${endPoint}`, {
         method: 'POST',
         headers: {
            'authorization': `Bearer ${token}`
         },
         body: formData
      })
      if (!res.ok) {
         throw new Error(`Error: ${res.status}`);
      }
      return await res.json()
   } catch (error) {
      return console.log(error)
   }
}

export {
   postMethod,
   postMethodSecured,
   postSecuredNotJson
}