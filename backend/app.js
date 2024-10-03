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
app.post('/user', async (req, res) => {
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