import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js'

const app = express();
app.use(express.json());
app.use(cors({
    origin:[process.env.FrontendURI],
    credentials:true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

app.use('/ping',(req,res)=>{
    res.send('pong');
})

//userRoute
app.use('/user', userRoutes);


app.all('*', (req,res)=>{
    res.status(404).send('OPPS 404 ,PAGE NOT FOUND');
});

export default app;