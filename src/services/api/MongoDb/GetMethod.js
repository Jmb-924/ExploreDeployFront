const apiUrl = import.meta.env.VITE_API_URL

const GetMethod = async (endPoint) => {
  try {
    const res = await fetch(`${apiUrl}${endPoint}`, {
      method: 'GET',
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

const GetMethodSecured = async (endPoint, token) => {
  try {
    const res = await fetch(`${apiUrl}${endPoint}`, {
      method: 'GET',
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
  GetMethod,
  GetMethodSecured,
}