import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        enum: {
            values: ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'],
            message: "mood must be sad, happy, neutral, angry, fearful, disgusted or surprised",
        },
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
});

const songModel = mongoose.model('Song', songSchema);
export default songModel;