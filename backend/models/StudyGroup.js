const mongoose = require('mongoose');

const StudyGroupSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    subject: {
        type: String, 
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    numMembers: {
        type: Number,
        default: 4
    },
    members: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        }
    ],
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    timePreference: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Evening', 'Night', 'No Preference']
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('StudyGroup', StudyGroupSchema);