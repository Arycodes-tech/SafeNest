const PROPERTIES_URL = import.meta.env.VITE_API_PROPERTIES_URL || 'http://localhost:5000/api/properties'
const AUTH_URL = import.meta.env.VITE_API_AUTH_URL || 'http://localhost:5001/api/v1'

export function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Request failed: ${res.status}`)
  }
  return res.json()
}


export async function fetchAllListings() {
  const res = await fetch(`${PROPERTIES_URL}/all`, { headers: getAuthHeaders() })
  return handleResponse(res)
}

export async function searchListings(filters = {}) {
  const params = new URLSearchParams()
  if (filters.city) params.set('city', filters.city)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
  if (filters.type) params.set('type', filters.type)
  if (filters.amenities) params.set('amenities', filters.amenities)
  const res = await fetch(`${PROPERTIES_URL}/search?${params}`, { headers: getAuthHeaders() })
  return handleResponse(res)
}

export async function fetchPropertyById(id) {
  const res = await fetch(`${PROPERTIES_URL}/${id}`, { headers: getAuthHeaders() })
  return handleResponse(res)
}

export async function createProperty(data) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${PROPERTIES_URL}/create`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: data, 
  })
  return handleResponse(res)
}

export async function updateProperty(id, data) {
  const res = await fetch(`${PROPERTIES_URL}/update/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteProperty(id) {
  const res = await fetch(`${PROPERTIES_URL}/delete/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}


export async function registerUser(data) {
  const res = await fetch(`${AUTH_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function loginUser(data) {
  const res = await fetch(`${AUTH_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function getMe() {
  const res = await fetch(`${AUTH_URL}/users/me`, { headers: getAuthHeaders() })
  return handleResponse(res)
}

export async function updateMe(data) {
  const res = await fetch(`${AUTH_URL}/users/updateMe`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteMe() {
  const res = await fetch(`${AUTH_URL}/users/deleteMe`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}