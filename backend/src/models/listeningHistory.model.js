import mongoose from "mongoose";

const listeningHistorySchema = new mongoose.Schema({
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    detectedMood: {
        type: String,
        enum: ['neutral','happy','sad','angry','fearful','disgusted','surprised'],
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
    strict: true
});

listeningHistorySchema.index({ user: 1, createdAt: -1 });
listeningHistorySchema.index({ song: 1, user: 1 });
listeningHistorySchema.index({ song: 1, createdAt: -1 });

const listeningHistoryModel = mongoose.model('ListeningHistory', listeningHistorySchema);
export default listeningHistoryModel;