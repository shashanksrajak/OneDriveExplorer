// Microsoft Azure Service

const axios = require('axios');

const baseURL = `https://graph.microsoft.com/v1.0`

exports.azureListFiles = async (token) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseURL}/me/drive/root/children`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error.message);
        if (error instanceof axios.AxiosError) {
            console.log(error.response.data)
        }
    }
}

exports.azureListPermissions = async (token, itemId) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseURL}/me/drive/items/${itemId}/permissions`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error.message);
        if (error instanceof axios.AxiosError) {
            console.log(error.response.data)
        }
    }
}
