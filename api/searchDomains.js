const axios = require('axios');
const access_token = require('../auth/authentication');


module.exports = searchDomain = async (domain) => {

    const api_key = await access_token();
    console.log("ACCESS TOKEN");
    console.log(api_key);

    try {

        const response = await axios.get('https://api.snov.io/v2/domain-emails-with-info?', {
            params: {
                            
                access_token: api_key,
                type: "personal",
                domain: domain,
                limit: 10,
                lastId: 0
            }
        })
        return response.data;
    }
    catch (err) {
        console.log(`ERROR IN SEARCHDOMAINS ${err}`)
        return null
    }
}



