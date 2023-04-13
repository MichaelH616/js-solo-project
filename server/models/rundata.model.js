const mongoose = require('mongoose');

const RunDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Give your run a name!'],
        min: [2, 'Name must contain at least 2 characters']
    },
    date: {
        type: Date,
        required: [true, 'Enter the date of the run']
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
        validate: {
            validator: function(v) {
                return /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid time in hh:mm:ss format!`
        }
    },
    distance: {
        type: Number,
        required: [true, 'Distance is required']
    }
},
    {timestamps:true},
);

module.exports = mongoose.model('RunData', RunDataSchema);