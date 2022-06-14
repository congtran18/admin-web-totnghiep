import api from "../api/api"

// Update user
const acceptTutor = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    console.log("token", token)

    const response = await api.get(`/tutor/accept/${id}`, config);


    return response.data;
};

// Get all users
const getTutors = async (token, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.get("/tutor", { params }, config);

    return response.data
};

const getRegisterTutors = async (token, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.get("/tutors/Register", { params }, config);

    return response.data;
};

//Get user by id
const getTutorById = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.get(`/tutor/${id}`, config);

    return response.data;
};

// Delete user by id
const trackTutor = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.get(`/tutors/track/${id}`, config);

    return response;
};

// Remove forever user by id
const removeTutor = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await api.delete(`/tutors/${id}`, config);

    return response;
};

const tutorService = {
    acceptTutor,
    getTutors,
    getRegisterTutors,
    getTutorById,
    trackTutor,
    removeTutor
};

export default tutorService;
