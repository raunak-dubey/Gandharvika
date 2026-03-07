import multer from 'multer';
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB
    }
});

const uploadMiddleware = upload.single('song')

export default uploadMiddleware;