const BASE_URL = 'http://localhost:8000/api'

export async function getPojects(query) {
    const listEndpoint = `${BASE_URL}/projects/`
    const searchEndpoint = `${BASE_URL}/search/?q=${query}`
    if (query) {
        const response = await fetch(searchEndpoint);
        const searchResults = await response.json();
        return {
            count: searchResults.nbHits,
            results: searchResults.hits,
            next: null,
            previous: null,
        }
    } else {
        const response = await fetch(listEndpoint);
        return await response.json();
    }
}

export async function getPoject(id) {
    const endpoint = `${BASE_URL}/projects/${id}`
    const response = await fetch(endpoint);
    return await response.json();
}

export async function createProject(data) {
  const endpoint = `${BASE_URL}/projects/`
  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }
  const response = await fetch(endpoint, options);
  return await response.json();
}

export async function updateProject(id, updates) {
  console.log(updates)
  const endpoint = `${BASE_URL}/projects/${id}/update/`
  const options = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(updates)
  }
  const response = await fetch(endpoint, options);
  return await response.json();
}

export async function deleteProject(id) {
  const endpoint = `${BASE_URL}/projects/${id}/delete`
  const options = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  }
  await fetch(endpoint, options);
}
