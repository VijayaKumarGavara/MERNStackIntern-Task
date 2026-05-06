const API_URL = 'http://localhost:5000/api/users';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw { response: { data: error } };
  }
  return response;
};

export const userAPI = {
  getAllUsers: (page = 1, limit = 10) =>
    fetch(`${API_URL}/?page=${page}&limit=${limit}`)
      .then(handleResponse)
      .then(res => res.json()),

  getUserById: (id) =>
    fetch(`${API_URL}/${id}`)
      .then(handleResponse)
      .then(res => res.json()),

  createUser: (userData) =>
    fetch(`${API_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(handleResponse)
      .then(res => res.json()),

  updateUser: (id, userData) =>
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(handleResponse)
      .then(res => res.json()),

  deleteUser: (id) =>
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(handleResponse)
      .then(res => res.json()),

  searchUsers: (query) =>
    fetch(`${API_URL}/search?query=${query}`)
      .then(handleResponse)
      .then(res => res.json()),

  exportToCSV: () =>
    fetch(`${API_URL}/export-csv`)
      .then(handleResponse)
      .then(res => res.blob()),
};
