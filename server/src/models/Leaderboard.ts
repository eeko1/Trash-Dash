import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
    username: String,
    points: Number,
    createdAt: { type: Date, default: Date.now }
});

export const LeaderboardModel = mongoose.model('LeaderBoard', LeaderboardSchema, 'LeaderBoard');