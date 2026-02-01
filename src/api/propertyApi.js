import API from "./api";

// Get all properties of logged owner
export const getOwnerProperties = async () => {
  try {
    const response = await API.get("/api/pgs");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single property by ID
export const getPropertyById = async (id) => {
  try {
    const response = await API.get(`/api/pgs/${id}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new property
export const createProperty = async (propertyData) => {
  try {
    const response = await API.post("/api/pgs", propertyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a property
export const updateProperty = async (id, propertyData) => {
  try {
    const response = await API.put(`/api/pgs/${id}`, propertyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a property
export const deleteProperty = async (id) => {
  try {
    const response = await API.delete(`/api/pgs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
