const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogEntrySchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ipAddress: String
});

module.exports = mongoose.model('LogEntry', LogEntrySchema);
