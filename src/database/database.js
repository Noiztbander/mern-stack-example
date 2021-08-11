const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.URL_ATLAS || "mongodb://localhost/mern-project-example";

mongoose.connect(uri,{
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify:false,
	useUnifiedTopology:true
}).then((db)=>{
	console.log("DB is connected");
}).catch((err)=>{
	console.error(err);
});

module.exports = mongoose;