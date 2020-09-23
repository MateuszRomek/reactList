const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(401).json({ message: 'UNAUTHORIZED! No token provided' });
	}
	const token = authHeader.split(' ')[2];

	jwt.verify(token, process.env.SECRET, function (err, decoded) {
		if (err) {
			console.log(err);
			res.status(401).json({ message: 'UNAUTHORIZED!' });
		} else {
			req.userId = decoded.uId;
			next();
		}
	});
};

module.exports = isAuth;
