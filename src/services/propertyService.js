const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.safenest.com/v1'
 
function getAuthHeaders() {
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

export async function fetchVerifiedListings(filters = {}, page = 1, limit = 20) {
  const params = new URLSearchParams({
    verified: 'true',
    page,
    limit,
    ...(filters.type       && { type: filters.type }),
    ...(filters.minPrice   && { minPrice: filters.minPrice }),
    ...(filters.maxPrice   && { maxPrice: filters.maxPrice }),
    ...(filters.bedrooms   && { bedrooms: filters.bedrooms }),
    ...(filters.bathrooms  && { bathrooms: filters.bathrooms }),
    ...(filters.amenities  && { amenities: filters.amenities.join(',') }),
    ...(filters.furnished  !== undefined && { furnished: filters.furnished }),
    ...(filters.petsAllowed !== undefined && { petsAllowed: filters.petsAllowed }),
  })
  const res = await fetch(`${BASE_URL}/properties?${params}`, {
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}

export async function fetchPropertyById(id) {
  const res = await fetch(`${BASE_URL}/properties/${id}`, {
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}

export async function fetchSavedListings() {
  const res = await fetch(`${BASE_URL}/users/me/saved-listings`, {
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}

export async function saveProperty(propertyId) {
  const res = await fetch(`${BASE_URL}/users/me/saved-listings`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ propertyId }),
  })
  return handleResponse(res)
}

export async function unsaveProperty(propertyId) {
  const res = await fetch(`${BASE_URL}/users/me/saved-listings/${propertyId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}

export async function clearAllSaved() {
  const res = await fetch(`${BASE_URL}/users/me/saved-listings`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}

export async function reportProperty(propertyId, reason = 'suspicious') {
  const res = await fetch(`${BASE_URL}/properties/${propertyId}/report`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ reason }),
  })
  return handleResponse(res)
}