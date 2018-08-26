const app = require('express')();
const bodyParser = require('body-parser');
const auth = require('./auth/jwt');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.send('Hello World!');
});

app.get('/login', (req, res, next) => {
    res.send(`get login page`);
});

app.post('/login', auth.login);

app.post('/test', auth.authOptions(), (req, res, next) => {
    console.log('success');
    res.json({message: 'success'});
});

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});