const express = require('express');
const app = express();
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const users = [
    {id: '2f24vvg', email: 'test@test.com', password: 'password'}
];

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        console.log('Inside local starategy callback');
        const user = users[0];
        if (email === user.email && password === user.password) {
            console.log('Local strategy return true');
            return done(null, user);
        }
    }
));

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback user id is save to the session file store here');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback');
    console.log(`The user id passport saved in the session file store is: ${id}`);
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    genid: (req) => {
        console.log('Inside the session Middleware');
        console.log(req.sessionID);
        return uuid();
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    console.log('Inside the homepage callback function');
    console.log(req.sessionID);
    res.send(`you just hit the home page\n`);
});

app.get('/login', (req, res) => {
    console.log('Inside GET /login callback function');
    console.log(req.sessionID);
    res.send('You got the login page\n');
});

app.post('/login', (req, res, next) => {
    console.log('Inside POST /login callback function');
    passport.authenticate('local', (error, user, info) => {
        console.log(`req.session.passsport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        req.login(user, (error) => {
            console.log('Inside req.login() callback');
            console.log(`req.session.passsport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user ${JSON.stringify(req.user)}`)
            res.send('You were authenticated & logged in! \n');
        });
    })(req, res, next);
});

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});