const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const User = require('./models/User');
const StudyGroup = require('./models/StudyGroup');
const wrapAsync = require('./middleware/wrapAsync');

const authMiddleware = require('./middleware/auth');

const JWT_SECRET = 'test_key'

app = express();

//middlware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


// connect to our db
mongoose.connect('mongodb://127.0.0.1:27017/groupwise');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});

// ------------ ROUTES START HERE ------------ //

//get specific user

//user reg
app.post('/user/register', async (req, res) => {
    console.log('hii');
    console.log(req.body);
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

//create a study group
app.post('/study-group/create', authMiddleware, async (req, res) => {
    const { groupName, subject, timePreference, description } = req.body;
    const { userId } = req.user;

    try { 
        const studyGroup = new StudyGroup({ 
            groupName, 
            subject,
            timePreference, 
            description, 
            creator: userId,
            members: [userId]
            })
        
        await studyGroup.save();
        res.status(201).json({ message: `created ${groupName} study group` });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error in making study group :( ', err })
    }
})

//join a study group
app.post('/study-group/join/:studyGroupId', authMiddleware, async (req, res) => {
    const { studyGroupId } = req.params;
    const { userId } = req.user;

    try {
        const studyGroup = await StudyGroup.findById(studyGroupId);

        if(studyGroup){
            if(!studyGroup.members.includes(userId)){
                studyGroup.members.push(userId);
                await studyGroup.save();
                res.status(200).json({ message: 'joined succcessfully!' });
            } else {
                res.status(400).json({ message: 'already a member of this group!' });
            }
        } else { 
            res.status(400).json({ message: 'group does not exist' });
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'server error in joining study group', err});
    }
})

//get all study groups (with filter)
app.get('/study-group', async (req, res) => {
    //get relevant filter queries
    const { timePreference, subject } = req.query;
    
    //group filters
    let filters = {};
    if(subject){
        filters = {...filters, subject};
    }
    if(timePreference){
        filters = {...filters, timePreference};
    }
    
    const studyGroups = await StudyGroup.find(filters).populate('members creator');
    res.status(200).json({ message: 'found all study groups', studyGroups });
})

//get all of a certain users study groups
app.get('/study-group/user', authMiddleware, async (req, res) => {
    const { userId } = req.user;
    try {
        const userGroups = await StudyGroup.find({ $or: 
            [
                { creator: userId },
                { members: userId, creator: { $ne: userId } }
            ]
        }).populate('members creator');

        res.status(200).json({ message: 'found user study groups', userGroups});

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error while getting user study groups' });
    }
})

//leave study group
app.post('/study-group/leave/:studyGroupId', authMiddleware, async (req, res) => {
    const { studyGroupId } = req.params;
    const { userId } = req.user;
    try {
        const studyGroup = await StudyGroup.findById(studyGroupId); 

        if(!studyGroup){
            res.status(404).json({ message: `study group ${studyGroupId} not found` })
        } else {
            studyGroup.members = studyGroup.members.filter(member => member.toString() !== userId);
            await studyGroup.save();
            
            res.status(200).json({ message: 'successfully left study group' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'server error while leaving study group', err });
    }
})

app.delete('/study-group/:studyGroupId', authMiddleware, async (req, res) => {
    const { studyGroupId } = req.params;
    const { userId } = req.user;
    try {
        const studyGroup = await StudyGroup.findById(studyGroupId);

        if(!studyGroup){
            res.status(404).json({ message: `study group ${studyGroupId} not found` });
        } else {
            //check that current user created the initial study group
            if(studyGroup.creator.toString() === userId){
                await StudyGroup.findByIdAndDelete(studyGroupId);
                res.status(200).json({ message: `successfully deleted study group ${studyGroupId}` });
            } else {
                res.status(403).json({ message: 'you are UNAUTHORIZED to delete this study group >:(' });
            }
        }
    } catch(err){
        res.status(500).json({ message: 'delete study group', err: err.toString() });
    }
})


//default home route
app.get('/', (req, res) => {
    res.json({ message: 'welcome to group wise!' });
})

app.all('*', (req, res, next) => {
    console.log('FALLBACK ERROR');
    next();
})

//run express app
app.listen(8000, () => {
    console.log('serving on port 8000')
})