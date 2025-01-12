import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import routes from './src/routes/userRoutes.js'

dotenv.config()
const app = express();

mongoose.Promise= global.Promise
mongoose.connect(process.env.DB_URI,{})

const PORT = process.env.PORT

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

routes(app)

app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`)
);
app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);