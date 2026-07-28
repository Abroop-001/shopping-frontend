const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("fitzone_token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = { message: "Failed to parse response" };
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

const api = {
  get: (url, options) => apiCall(url, { method: "GET", ...options }),
  post: (url, body, options) => apiCall(url, { method: "POST", body: JSON.stringify(body), ...options }),
  put: (url, body, options) => apiCall(url, { method: "PUT", body: JSON.stringify(body), ...options }),
  delete: (url, options) => apiCall(url, { method: "DELETE", ...options }),
};

export default api;
