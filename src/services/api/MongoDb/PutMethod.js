const apiUrl = import.meta.env.VITE_API_URL

const putMethod = async (endPoint, formData) => {
   try {
      const res = await fetch(`${apiUrl}${endPoint}`, {
         method: 'PUT',
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

const putMethodSecured = async (endPoint, token, formData) => {
   try {
      const res = await fetch(`${apiUrl}${endPoint}`, {
         method: 'PUT',
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

const putSecuredNotJson = async (endPoint, token, formData) => {
   try {
      const res = await fetch(`${apiUrl}${endPoint}`, {
         method: 'PUT',
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
   putMethod,
   putMethodSecured,
   putSecuredNotJson
}