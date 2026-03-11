import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    album: {
        type: String,
        required: true,
        trim: true
    },
    mood: {
        type: String,
        enum: {
            values: ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'],
            message: "mood must be sad, happy, neutral, angry, fearful, disgusted or surprised",
        },
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: null,
    },
    duration: {
        type: Number,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
     playCount: {
        type: Number,
        default: 0
    },

    likeCount: {
        type: Number,
        default: 0
    },

    tags: {
        type: [String],
        default: []
    }

}, { timestamps: true });

songSchema.index({ mood: 1 });
songSchema.index({ playCount: -1 });
songSchema.index({ title: "text", artist: "text" });

const songModel = mongoose.model('Song', songSchema);
export default songModel;