import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

mongoose.Promise= global.Promise
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true
})

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${process.env.PORT}`)
);

app.listen(PORT, () => 
    console.log(`Your server is running on port ${process.env.PORT}`)
);
