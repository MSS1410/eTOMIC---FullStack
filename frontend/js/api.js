export const API_URL = 'http://localhost:3066/api/v1'

let authToken = localStorage.getItem('authToken')

export async function apiFetch(endpoint, options = {}) {
  // textraer URL
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`

  const headers = { ...options.headers }

  // isForm booleano TRUE -> si recibo formdata
  const isForm = options.body instanceof FormData
  // intance of -> comprueba en ejecución si es formData

  // formdata false añado JSON // formfdata TRUE multipart formdata se autogestiona
  if (!isForm && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  try {
    const response = await fetch(url, { ...options, headers })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error while apiFetch:', error)
    throw error
  }
}

export function setAuthToken(token) {
  authToken = token
  if (token) {
    localStorage.setItem('authToken', token)
  } else {
    localStorage.removeItem('authToken')
  }
}
