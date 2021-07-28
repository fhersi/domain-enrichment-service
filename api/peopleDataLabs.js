const axios = require('axios');

    
 module.exports = enrichPerson = async (person) => {
    try {
        const response = await axios.get('https://api.peopledatalabs.com/v5/person/enrich', {

            params: {
                api_key: "",
                first_name: person.firstName,
                last_name: person.lastName,
                company: person.companyName,
                email: person.email,
                profile: person.sourcePage
         }
        })
        
        return response.data;
    }
    catch (err) {
        console.log(`ERROR WITH ENRICHMENT ${err}`)
        return null;
    }
}