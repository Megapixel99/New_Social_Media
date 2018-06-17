const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const clientSessions = require('client-sessions');
mongoose.connect(
	'mongodb://<Admin>:<A08101999>@ds018238.mlab.com:18238/newsocial'); // Connecting to the database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); // If connection failed
db.once("open", function(callback) {
	console.log("Connection succeeded."); // If connection succeeded
});
const UserShm = mongoose.Schema({
	Username: String,
	Password: String,
	Followers: Array,
	Following: Array
});
const PostShm = mongoose.Schema({
	User: String,
	Textbox: String,
	Likes: Number,
	LikedBy: Array,
	Comments: Array
});
const ActivityShm = mongoose.Schema({
	User: String,
	Notif: String
});
var curuser;
const User = mongoose.model('UserList', UserShm);
const Post = mongoose.model('PostList', PostShm);
const Act = mongoose.model('ActList', ActivityShm);
router.get("/signup", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/signup.html");
});
router.post("/signup", function(req, res) {
	User.findOne({
		Username: req.body.username
	}, function(err, obj) {
		curuser = obj;
		if (curuser) {
			res.json({
				username: curuser.Username
			});
		} else if (err) {
			console.error(err);
		} else if (!curuser) {
			var myData = new User({
				Username: req.body.username,
				Password: req.body.password,
				Followers: [],
				Following: []
			});
			//if (req.body.username.length >= 5) {
			//  if (req.body.password.length >= 5) {
			myData.save().then(item => {
				console.log("saved user: " + req.body.username + "");
			}).catch(err => {
				console.error("unable to save user: " + req.body.username + "");
			});
			curuser = myData;
			res.json({
				redirect: "/",
				username: curuser.Username
			});
		}
	});
});
router.get("/", function(req, res) {
	if (!curuser || curuser == undefined) {
		router.post("/login");
	}
	res.sendFile(__dirname + "/Client/HTML/home.html");
});
router.get("/userinfo/:user", function(req, res) {
	if (curuser && curuser != undefined) {
		User.findOne({
			User: req.params.user
		}, function(err, u) {
			Post.find({
				User: req.params.user
			}, function(err, p) {
				if (!p || p != undefined) {
					res.json({
						user: u,
						posts: p
					});
				}
			});
		});
	} else {
		res.json({
			redirect: "/login"
		});
	}
});
router.get("/userinfo", function(req, res) {
	if (curuser && curuser != undefined) {
		Post.find({
			User: curuser.Username
		}, function(err, obj) {
			if (!obj || obj != undefined) {
				res.json({
					curuser, posts: obj
				});
			}
		});
	} else {
		res.json({
			redirect: "/login"
		});
	}
});
router.post("/getfollowing", function(req, res) {
	User.find({
		Username: req.body.user
	}, function(err, obj) {
		if (!obj || obj != undefined) {
			res.json({
				follow: obj,
				curuser
			});
		}
	});
});
router.post("/login", function(req, res) {
	User.findOne({
		Username: req.body.username,
		Password: req.body.password
	}, function(err, obj) {
		curuser = obj;
		if (!curuser || curuser == undefined) {
			res.json({
				redirect: "/signup"
			});
		} else if (curuser) {
			res.json({
				redirect: "/"
			});
		} else if (err) {
			console.error(err);
		}
	});
});
router.post("/upload", function(req, res) {
	if (!curuser || curuser == undefined) {
		res.json({
			redirect: "/login"
		});
	} else if (curuser) {
		var myData = new Post({
			User: curuser.Username,
			Textbox: req.body.textbox,
			Likes: 0,
			LikedBy: [],
			Comments: []
		});
		//if (req.body.username.length >= 5) {
		// if (req.body.password.length >= 5) {
		myData.save().then(item => {
			console.log("saved post: " + myData.Textbox + " for: " + myData.User);
		}).catch(err => {
			console.error("unable to save post: " + myData.Textbox + " for: " +
				myData.User);
		});
		res.json({
			text: myData.Textbox,
			curuser
		});
	} else if (err) {
		console.error(err);
	}
});
router.post("/logout", function(req, res) {
	curuser = undefined;
	res.json({
		redirect: "/login"
	});
});
router.post("/likepost", function(req, res) {
	Post.findOneAndUpdate({
		Textbox: req.body.posttext
	}, {
		$push: {
			LikedBy: curuser.Username
		},
		$inc: {
			Likes: 1
		}
	}, function(err, p) {
		//if (!p.LikedBy.includes(curuser.Username))
		{
			res.json({
				post: p
			});
		}
	});
});
router.post("/commentpost", function(req, res) {
	Post.findOneAndUpdate({
		Textbox: req.body.posttext
	}, {
		$push: {
			LikedBy: curuser.Username
		},
		$inc: {
			Likes: 1
		}
	}, function(err, p) {
		res.json({
			post: p
		});
	});
});
router.get("/list", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/list.html");
});
router.post("/list", function(req, res) {
	if (curuser && curuser != undefined) {
		Post.find({
			User: curuser.Following
		}, function(err, p) {
			res.json({
				posts: p
			});
		});
	} else {
		res.json({
			redirect: "/login"
		});
	}
});
router.get("/login", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/login.html");
});
router.get("/findUsers", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/findUsers.html");
});
router.get("/activity", function(req, res) {
	res.sendFile(__dirname + "/Client/HTML/activity.html");
});
router.post("/activity", function(req, res) {
	Act.find({
		User: curuser.Username
	}, function(err, obj) {
		res.json(obj);
	})
});
router.post("/findUsers", function(req, res) {
	if (curuser && curuser != undefined) {
		User.find({
			Username: {
				$ne: curuser.Username
			}
		}, function(err, obj) {
			res.json({
				obj
			});
		});
	} else {
		res.json({
			redirect: "/login"
		});
	}
});
router.post("/follow", function(req, res) {
	User.findOne({
		Username: curuser.Username
	}, function(err, obj) {
		if (!obj.Following.includes(req.body.username)) {
			User.findOneAndUpdate({
				Username: curuser.Username
			}, {
				$push: {
					Following: req.body.username
				}
			}, function(err, doc) {
				if (err) return res.send(500, {
					error: err
				});
				User.findOne({
					Username: curuser.Username
				}, function(err, obj) {
					curuser = obj;
				});
			})
			User.findOneAndUpdate({
				Username: req.body.username
			}, {
				$push: {
					Followers: curuser.Username
				}
			}, function(err, doc) {
				if (err) return res.send(500, {
					error: err
				});
				var myData = new Act({
					User: req.body.username,
					Notif: curuser.Username + " has started following you"
				});
				myData.save();
			})
		}
	})
});
router.post("/unfollow", function(req, res) {
	User.findOne({
		Username: curuser.Username
	}, function(err, obj) {
		if (obj.Following.includes(req.body.username)) {
			User.findOneAndUpdate({
				Username: curuser.Username
			}, {
				$pull: {
					Following: req.body.username
				}
			}, function(err, doc) {
				User.findOne({
					Username: curuser.Username
				}, function(err, obj) {
					curuser = obj;
				});
			})
			User.findOneAndUpdate({
				Username: req.body.username
			}, {
				$pull: {
					Followers: curuser.Username
				}
			}, function(err, obj) {});
		}
	})
});
module.exports = router
