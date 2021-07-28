const express = require('express');
const path = require('path');
const axios = require('axios')


const engine = require('ejs-mate');
const methodOverride = require('method-override');
const { Console } = require('console');
const { response } = require('express');



const access_token = async () => {
    try {
        const response = await axios.post('https://api.snov.io/v1/oauth/access_token', {
            grant_type: "client_credentials",
            client_id: "",
            client_secret: ""
        
        })
        console.log(response)
        return response.data.access_token;
} catch(err) {
        console.log("Access token ERROR SNOVIO")
        return null;
    }
}


const enrichPerson = async (person) => {
    console.log("in enrich function")
    console.log(person)
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
        
        console.log(`ENRICHPERSON \n ${response}`)
        return response.data;
    }
    catch (err) {
        return null;
    }
}


const searchDomain = async (domain) => {

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
    catch (error) {
        return null
    }
}
      
  

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.post('/show', async (req, res) => {
    const domain = req.body.domain;
    
    const pLoad = await searchDomain(domain);
    
    //console.log("Payload")
    const { emails } = pLoad; 
  

    res.render('show', { emails })

})

app.post('/enrich', async (req, res) => {
    const person = req.body;
    //console.log(`PERSON \n ${person}`)
    const data = await enrichPerson(person);
    console.log("DATA")
    console.log(data)


    res.render('enrich', { data })
})

app.get('/', async (req, res) => {
    res.render('home')
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})