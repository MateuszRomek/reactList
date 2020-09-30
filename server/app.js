const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authentication');
const listsRoutes = require('./routes/lists');
const userRoutes = require('./routes/user');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use('/auth', authRoutes);
app.use(listsRoutes);
app.use(userRoutes);
app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	if (error.errorData) {
		res
			.status(status)
			.json({ message: message, error: error.errorData, status });
	} else {
		res.status(status).json({ message, status });
	}
});

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo connected');
		console.log('Listenint at port', process.env.BACKENDPORT);

		app.listen(process.env.BACKENDPORT);
	})
	.catch((err) => {
		console.log('Cannot connect to db');
		console.log(err);
	});
