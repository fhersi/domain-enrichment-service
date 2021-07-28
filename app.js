const express = require('express');
const path = require('path');


//--- imports --//
const access_token = require('./auth/authentication');
const enrichPerson = require('./api/peopleDataLabs');
const searchDomain = require('./api/searchDomains');


const engine = require('ejs-mate');
const methodOverride = require('method-override');

  

const app = express();

//--- Setting View Engine ---//

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//---- Middleware ---//

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.post('/show', async (req, res) => {
    const domain = req.body.domain;
    const data = await searchDomain(domain);
    const { emails } = data; 
    res.render('show', { emails })

})

app.post('/enrich', async (req, res) => {
    const person = req.body;
    const data = await enrichPerson(person);

    res.render('enrich', { data })
})

app.get('/', async (req, res) => {
    res.render('home')
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})