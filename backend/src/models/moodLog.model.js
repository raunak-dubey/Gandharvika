import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    detectedMood: {
        type: String,
        enum: ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'],
        required: true,
    },
    confidence: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
    }
}, {
    timestamps: true,
    versionKey: false,
    strict: true
});

moodLogSchema.index({ user: 1, createdAt: -1 });

const moodLogModel = mongoose.model('MoodLog', moodLogSchema);
export default moodLogModel;