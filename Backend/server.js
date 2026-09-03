require("dotenv").config();

const app = require('./src/app');
const connectToDB = require('./src/config/database');


console.log('Key loaded:', process.env.GEMINI_API_KEY ? 'yes' : 'no');


connectToDB()


app.listen(3000,()=>{
console.log('server is running on port 3000');
})