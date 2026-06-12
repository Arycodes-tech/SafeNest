const MESSAGING_URL = import.meta.env.VITE_API_MESSAGING_URL || 'http://localhost:5001/api/v1'

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


export async function sendMessage(data) {
  const res = await fetch(`${MESSAGING_URL}/messages/send`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function reportMessage(data) {
  const res = await fetch(`${MESSAGING_URL}/messages/report`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function getDashboardKPIs() {
  const res = await fetch(`${MESSAGING_URL}/analytics/dashboard-kpis`, {
    headers: getAuthHeaders(),
  })
  return handleResponse(res)
}

export async function checkHealth() {
  const res = await fetch(`${MESSAGING_URL}/health`)
  return handleResponse(res)
}