const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const cors = require('cors');

const JWT_SECRET = 'test_key'

app = express();

//middlware
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// connect to our db
mongoose.connect('mongodb://127.0.0.1:27017/groupwise');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});

// ------------ ROUTES START HERE ------------ //

//user reg
app.post('/user/register', async (req, res) => {
    const { username, email, password, major, timePreference } = req.body;

    //check if user already exists 
    try { 
        const existingUser = await User.findOne({ email });

        if(existingUser){
            res.status(400).json({ message: 'user already exists'});
        } else {
            //reg new user
            const user = new User({ username, email, password, major, timePreference });
            await user.save();

            res.status(201).json({ message: 'successful reg' })
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'error in user reg', err });
    }
})

//user login
app.post('/user/login', async (req, res) => {
    //TODO change to normal reg by username and email reg by google oaauth if ther eis time
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if(user){
            const isValidLogin = await user.verify(password);

            if(!isValidLogin){
                res.status(400).json({ message: 'bad user credentials go away' });
            } else {
                const jwtToken = jwt.sign({ userId:user.id }, JWT_SECRET, { expiresIn: '24h' });
                res.status(200).json({ message: 'successful login yipyp', token: jwtToken })
            }
        } else {
            res.status(400).json({ message: 'invalid credentials - you dont exist' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error while logging in', err });
    }
})

//default home route
app.get('/', (req, res) => {
    res.json({ message: 'welcome to group wise!' })
})

app.all('*', (req, res, next) => {
    console.log('FALLBACK ERROR');
    next();
})


//run express app
app.listen(8000, () => {
    console.log('serving on port 8000')
})