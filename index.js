require('express-async-errors');
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const methodOverride = require('method-override');
const routes = require('./routes')
const Database = require('./middlewares/database-middleware');
const error = require('./middlewares/error-middleware')
const { sendJson } = require('./middlewares/generateResponse-middleware');
// const MongoStore = require('connect-mongodb-session')(session);
const MongoStore = require('connect-mongo');
Database.connect();

const app = express();
app.response.sendJson = sendJson;
const port = process.env.PORT || 8081;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(logger('dev'));
app.use(methodOverride('_method'));



// --------- Connect-mongodb-session ------------------ 

// const store = new MongoStore({
// 	uri : process.env.DB_URI,
// 	collection : 'sessions'
// })
///-------------

	app.use(session({
	secret : "secret",
	resave : true,
	saveUninitialized : true,
	cookie : {
		maxAge : 3600000
	},
	store : MongoStore.create({ mongoUrl : process.env.DB_URI, collectionName : 'sessions' }),
	// store : store			// for the package : connect-mongodb-session
}));


app.use('/', routes);

/* Error Handling middlewares */  

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

app.listen(port, () => console.log(`-----------> Server is up and running at ${8000}} <----------`));
