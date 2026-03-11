import mongoose from "mongoose";

const listeningHistorySchema = new mongoose.Schema({
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    detectedMood: {
        type: String,
        enum: ['neutral','happy','sad','angry','fearful','disgusted','surprised'],
        required: true,
    },
    playedAt: {
        type: Date,
        default: Date.now,
    },
});

listeningHistorySchema.index({ user: 1, playedAt: -1 });
listeningHistorySchema.index({ song: 1 });

const listeningHistoryModel = mongoose.model('ListeningHistory', listeningHistorySchema);
export default listeningHistoryModel;