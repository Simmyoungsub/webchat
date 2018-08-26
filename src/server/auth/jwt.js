const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const jwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');

const users = [
    {
        name: 'sim',
        email: 'sim@test.com',
        password: '1234'
    }
]

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, cb) => {
        return new Promise((resolve) => {
            let user = null;
            console.log(username, password);
            if (username === users[0].email && password === users[0].password) {
                user = users[0];
            }
            resolve(user);
        }).then((user) => {
            if (!user) {
                return cb(null, false, {message: 'Incorrect email or password'});
            }

            return cb(null, user, {message: 'Login Successfully'});
        }).catch((err) => {
            cb(err);
        });
    }
));

passport.use(new jwtStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
    (jwtPayload, cb) => {
        return cb(null, users[0]);
    }
))

const login = ((req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(info.message);
        if (err || !user) {
            return res.status(400).json({error: 'error'});
            // .json({
            //     message: 'Something is not right',
            //     user: user
            // });
        }

        req.login(user, {session: false}, (err) => {
            console.log('login callback');
            if (err) {
                console.log(err);
                res.send(err);
            }

            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({user, token});
        });
    })(req, res);
});

const authOptions = () => {
    return passport.authenticate('jwt', {session: false})
}

module.exports = {
    login,
    authOptions
};