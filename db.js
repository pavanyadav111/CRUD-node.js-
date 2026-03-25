/*
const mongoose = require ('mongoose')

// Define the MongoDB connection URI
 const mongoURL = 'mongodb://localhost:27017/hotels'

// Setup MongoDB connection
 
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the Default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listener for database connection
db.on('connected',()=>{
    console.log("Connected to MongoDB server");
    
})

db.on('error',(err)=>{
    console.log("MongoDB connection error",err);
    
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
    
})

//Export database connection 
module.exports = db;

*/

const mongoose = require('mongoose')

const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

mongoose.connect(mongoURL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("MongoDB connection error:", err));

const db = mongoose.connection;

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

module.exports = db;



