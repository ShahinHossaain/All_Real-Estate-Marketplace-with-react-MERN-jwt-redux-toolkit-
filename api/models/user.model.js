import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://t3.ftcdn.net/jpg/07/53/76/78/240_F_753767833_sd1LRhDY3tIdJEgXa0uTQDeKGAcd06ph.jpg"
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
