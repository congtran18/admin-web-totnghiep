import api from "../api/api"


// Save image to storage
const saveImage = async (data) => {
  const response = await api.post("/storage/single", data, {
    headers: {
      'Content-Type': 'form-data'
    }
});
  return response.data;
};


const storageService = {
  saveImage,
};

export default storageService;