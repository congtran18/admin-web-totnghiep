import api from "../api/api"

// Update user
const acceptWarning = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    console.log("token", token)

    const response = await api.get(`/warningTutor/accept/${id}`, config);


    return response.data;
};

// Get all users
const getWarnings = async (token, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.get("/warningTutor", config);

    return response
};

//Get user by id
const getWarningById = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.get(`/warningTutor/${id}`, config);

    return response;
};

// Remove forever user by id
const removeWarning = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.delete(`/warning/${id}`, config);

    return response;
};

const warningTutorService = {
    acceptWarning,
    getWarnings,
    getWarningById,
    removeWarning
};

export default warningTutorService;
