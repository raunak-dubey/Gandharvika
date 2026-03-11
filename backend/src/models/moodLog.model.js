import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    detectedMood: {
        type: String,
        enum: ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'],
        required: true,
    },
    confidence: {
        type: Number
    },
    detectedAt: {
        type: Date,
        default: Date.now,
    },
});

moodLogSchema.index({ user: 1, detectedAt: -1 });

const moodLogModel = mongoose.model('MoodLog', moodLogSchema);
export default moodLogModel;