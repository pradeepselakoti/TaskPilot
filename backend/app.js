import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middlewares/Auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FrontendURI],
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/ping', (req, res) => {
    res.send('pong');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', authMiddleware, userRoutes);

app.all('*', (req, res) => {
    res.status(404).send('OPPS 404 ,PAGE NOT FOUND');
});

export default app;
