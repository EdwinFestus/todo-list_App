require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

async function  startServer() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("+++++++ MongoDb Connected ++++++++++");

        app.listen(PORT, ()=> {
            console.log(`Server running  on port ${PORT}`);
        })
    }

    catch (error)  {
        console.error(error);
        process.exit(1);
    }
}

startServer();