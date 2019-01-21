const express = require('express');
const UserApi = express.Router();

const UserModel = require('../models/userModel');

//Middleware
UserApi.use((req, res, next) => {
	console.log("Middleware");
	req.user = "username1";
	next();
});

// CRUD - Create, Read, Update, Delete

// Read all users
UserApi.get('/', (req, res) => {
	UserModel.find({})
		.then((users) => {
			res.send({ data: users });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Read user by id
UserApi.get('/:userId', (req, res) => {
	const { userId } = req.params;
	UserModel.findById(userId)
		.then((userFound) => {
			res.send({ data: userFound });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Create user
UserApi.post('/', (req, res) => {
	const { username, password, avatar } = req.body;
	const newUsers = { username, password, avatar };
	UserModel.create(newUsers)
		.then((userCreated) => {
			res.send({ data: userCreated });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Update user
UserApi.put('/:userId', (req, res) => {
	const { userId } = req.params;
	const { password, avatar } = req.body;
	UserModel.findById(userId)
		.then((userFound) => {
			if(!userFound) res.send({ error: "User not exist!" })
			else {
				userFound.password = password;
				userFound.avatar = avatar;
				return userFound.save();
			}
		})
		.then((userUpdated) => {
			res.send({ data: userUpdated });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Delete user
UserApi.delete('/:userId', (req, res) => {
	const { userId } = req.params;
	UserModel.findByIdAndRemove(userId)
		.then(() => {
			res.send({ data: "success" });
		})
		.catch((error) => {
			res.send({ error });
		});
});

module.exports = UserApi;