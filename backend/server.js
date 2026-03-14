import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.config.js';
import logger from './src/utils/logger.js';

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is Connected to PORT ${PORT}`);
})