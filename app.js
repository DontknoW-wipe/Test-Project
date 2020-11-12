//REQUIRE MODULES.......
const express=require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session=require('express-session');
const path=require('path');
const routes = require('./routes/routes');

const app=express(); 
app.set("view engine","ejs");

//ENVIROMENT 
const TWO_HOURS=1000*60*60*2;

const {
	NODE_ENV="development",
	SESS_NAME="sid",
	SESS_LIFE=TWO_HOURS,
	SESS_SECRET='qwertyui/ddd'
}=process.env;

const IN_PROD= NODE_ENV==="production";

//SESSION SETUP

app.use(session({
	name:SESS_NAME,
	resave:false,
	saveUninitialized:false,
	secret:SESS_SECRET,
	cookie:{
		maxAge:SESS_LIFE,
		sameSite:true,
		secure:IN_PROD
	}
}));

//HTTP SERVER...
const http = require("http").Server(app);
const port = process.env.PORT || 3300;

const publicPath=path.join(__dirname,'/public');
app.use(express.static(publicPath));

//BODY-PARSER......
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));



//MONGODB DATABASE CONNECTION...
//var mongoDB= "mongodb://localhost:27017/TestApp";
var mongoDB="mongodb+srv://xyz1234:jadoo@1234@pastebinapp.dfwfw.mongodb.net/<TestAppData>?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => console.log('Database Connected!'))
.catch(err => {
console.error(err);
});

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log("Mongoose connected");
*/

//Routes
app.use('/', routes);

//LISTEN ON PORT SETTINGS.....
http.listen(port,'0.0.0.0',function(){
	console.log(`http://localhost:${port}`);
	
});