import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//routes
import AuthRoute from './routes/AuthRoute.js';
import authMiddleware from './middlewares/Auth.js';
import UserRoute from './routes/UserRoute.js';
import RoleRequestRoute from './routes/RoleRequestRoute.js';
import ProjectRoute from './routes/ProjectRoute.js';
import TasksRoute from './routes/TaskRoute.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['https://example.com', 'http://localhost:5173'],
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

app.use('/ping',(req,res)=>{
    res.send('pong');
})

//Used by all users to register and login
app.use('/api/v1/auth',AuthRoute)

app.use('/api/v1/user', authMiddleware,UserRoute);
app.use('/api/v1/roles/requests', authMiddleware,RoleRequestRoute);
app.use('/api/v1/projects', authMiddleware,ProjectRoute);
app.use('/api/v1/tasks', authMiddleware,TasksRoute);



app.all('*', (req,res)=>{
    res.status(404).send('OPPS 404 ,PAGE NOT FOUND');
});

export default app;