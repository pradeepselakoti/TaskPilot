import {config} from 'dotenv';
config();
import app from './app.js';
import connecttodb from './configs/db.js';
await connecttodb();

const PORT= process.env.PORT||5000;

app.listen(PORT,async ()=>{
   
    console.log(`server is working on port ${PORT}`);
    
    
    
});