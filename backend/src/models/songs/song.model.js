import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 60,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60,
    },
    album: {
        type: String,
        trim: true,
        default: null
    },
    mood: {
        type: String,
        enum: {
            values: ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'],
            message: "mood must be sad, happy, neutral, angry, fearful, disgusted or surprised",
        },
        required: true,
        index: true
    },
    audioUrl: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        default: null,
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    playCount: {
        type: Number,
        default: 0,
        min: 0
    },

    likeCount: {
        type: Number,
        default: 0,
        min: 0
    },

    tags: {
        type: [String],
        default: []
    }

}, {
    timestamps: true,
    versionKey: false,
    strict: true
});

songSchema.index({ mood: 1, playCount: -1 });
songSchema.index({ title: "text", artist: "text" });

const songModel = mongoose.model('Song', songSchema);
export default songModel;