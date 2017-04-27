
var express = require('express')
var http = require("http");
var path = require("path");
var db = require('./db');
var dbLink=require("./json/dbProduction.json");
var url = dbLink.devServer.url;
var session=require("express-session");
var app = express();
var handlebars=require("express-handlebars").create({defaultLayout:"main"});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
var publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));
app.use(session({
	secret: 'secret msg',
	resave: false,
	saveUninitialized: true
}))
var authAdmin=function(req,res,next){
	if(req.session &&req.session.admin)
		return next();
	else
		return res.send(401,"401: You need to log in!");
};

app.get('/calendar',authAdmin);
app.use(require('./routers/getScheduledLessons'));
app.use(require('./routers/signupServer'));
app.use(require('./routers/login'));
app.use(require('./routers/changeAvail'));
app.use(require('./routers/resetAvail'));
//app.use(require('./routers/checklogin'));

db.connect(url, function(err) {
	if (err) {
		console.log('Unable to connect to Mongo.');
		process.exit(1)}
	else {
		var listener=http.createServer(app).listen(process.env.PORT||3000);console.log('Server is listening at port'+listener.address().port);
	}
});

app.get('/', function (req, res) {
	console.log("Coming a request!");
	res.sendFile(`${publicPath}/main.html`);
});

app.get('/main', function (req, res) {
	console.log("Coming a main request!");
	res.sendFile(`${publicPath}/main.html`);
});

app.get('/calendar', function (req, res) {
	console.log("Coming a calendar request!");
	res.sendFile(`${publicPath}/calendar.html`);
});

app.get('/signUp', function (req, res) {
	console.log("Coming a signUp request!");
	res.sendFile(`${publicPath}/signUp.html`);
});

app.get("/signin",function(req,res){
		console.log("Coming a signuprequest!");
	res.render(`signin`);
});