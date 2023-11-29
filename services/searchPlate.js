// searchPlate.js
const axios = require('axios');

async function searchPlate(plateNumber) {
    try {
        const response = await axios.get('URL_TIL_API', { params: { plate: plateNumber } });
        return response.data;
    } catch (error) {
        throw new Error('Anmodningsfejl');
    }
}

module.exports = searchPlate;
