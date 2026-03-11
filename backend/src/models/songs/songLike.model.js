import mongoose from 'mongoose';

const songLikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
}, { timestamps: true });

songLikeSchema.index({ user: 1, song: 1 }, { unique: true });

const songLikeModel = mongoose.model('SongLike', songLikeSchema);
export default songLikeModel;