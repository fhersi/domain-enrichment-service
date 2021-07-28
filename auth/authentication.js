const axios = require('axios');

module.exports = access_token = async () => {
    try {
        const response = await axios.post('https://api.snov.io/v1/oauth/access_token', {
            grant_type: "client_credentials",
            client_id: "",
            client_secret: ""
        
        })
        
        return response.data.access_token;
} catch(err) {
        console.log("Access token ERROR SNOVIO")
        return null;
    }
}
