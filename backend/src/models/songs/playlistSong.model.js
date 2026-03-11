import mongoose from 'mongoose';

const playlistSongSchema = new mongoose.Schema({
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        required: true,
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

playlistSongSchema.index({ playlist: 1, song: 1 }, { unique: true });

const playlistSongModel = mongoose.model('PlaylistSong', playlistSongSchema);
export default playlistSongModel;