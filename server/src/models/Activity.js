import mongoose from "mongoose";
import User from "./User.js";

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    activityType: {
        type: String
    },
    deviceType: {
        type: String
    },
    time: {
        type: String,
    }
}, { timestamps: true })

const Activity = mongoose.model('Activity', activitySchema);

export default Activity