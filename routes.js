const express = require("express");
const router = express.Router();
var curuser;
router.get("/", function(req, res) {
    if (!curuser || curuser == undefined) {
        res.redirect("/login");
    } else {
        res.redirect("/names");
    }
});
router.post("/login", function(req, res) {
    if (req.body.username == req.body.password) {
        curuser = req.body.username;
        console.log(curuser);
        res.json({
            redirect: "/"
        });
    } else {
        res.redirect("/signup");
    }
});
router.get("/login", function(req, res) {
    res.sendFile(__dirname + "/Client/HTML/login.html");
});
router.get("/names", function(req, res) {
    if (!curuser || curuser == undefined) {
        res.redirect("/login");
    } else {
            res.json({
                P1: {
                    name: "Seth Wheeler"
                },
                P2: {
                    name: "Charles Black"
                },
                P3: {
                    name: "Ryan Knee"
                },
                P4: {
                    name: "Joseph Tang"
                },
                P5: {
                    name: "Eugene Robinson"
                },
                P6: {
                    name: "Jordan Whisler"
                }
            });
        }
});
router.get("/addresses", function(req, res) {
    if (!curuser || curuser == undefined) {
        res.redirect("/login");
    } else {
            res.json({
                P1: {
                    address: "1863 Via Primero"
                },
                P2: {
                    address: "1234 Main Street"
                },
                P3: {
                    address: "69879 Rosevelt"
                }
            });
        }
});
router.get("/contact", function(req, res) {
    if (!curuser || curuser == undefined) {
        res.redirect("/login");
    } else {
            res.json({
                P1: {
                    phoneNumber: 7609176976
                },
                P2: {
                    phoneNumber: 5676968965
                },
                P3: {
                    phoneNumber: 5575588975
                }
            });
        }
});
router.get("/names/:id", function(req, res) {
    if (!curuser || curuser == undefined) {
        res.redirect("/login");
    } else {
        console.log(req.params.id);
        if (req.params.id != undefined && req.params.id != null) {
            console.log(req.params.id);
            if (req.params.id == 1) {
                res.json({
                    name: "Seth Wheeler"
                });
            } else if (req.params.id == 2) {
                res.json({
                    name: "Charles Black"
                });
            } else if (req.params.id == 3) {
                res.json({
                    name: "Ryan Knee"
                });
            } else if (req.params.id == 1) {
                res.json({
                    name: "Joseph Tang"
                });
            } else if (req.params.id == 2) {
                res.json({
                    name: "Eugene Robinson"
                });
            } else if (req.params.id == 3) {
                res.json({
                    name: "Jordan Whisler"
                });
            } else {
                res.send("Person not found")
            }
        } else {
            res.json({
                P1: {
                    name: "Seth Wheeler"
                },
                P2: {
                    name: "Charles Black"
                },
                P3: {
                    name: "Ryan Knee"
                },
                P4: {
                    name: "Joseph Tang"
                },
                P5: {
                    name: "Eugene Robinson"
                },
                P6: {
                    name: "Jordan Whisler"
                }
            });
        }
    }
});
router.get("/addresses/:id", function(req, res) {
    if (!curuser || curuser == undefined) {
        res.redirect("/login");
    } else {
        console.log(req.params.id);
        if (req.params.id != undefined && req.params.id != null) {
            console.log(req.params.id);
            if (req.params.id == 1) {
                res.json({
                    address: "1863 Via Primero"
                });
            } else if (req.params.id == 2) {
                res.json({
                    address: "1234 Main Street"
                });
            } else if (req.params.id == 3) {
                res.json({
                    address: "69879 Rosevelt"
                });
            } else {
                res.send("Person not found")
            }
        } else {
            res.json({
                P1: {
                    address: "1863 Via Primero"
                },
                P2: {
                    address: "1234 Main Street"
                },
                P3: {
                    address: "69879 Rosevelt"
                }
            });
        }
    }
});
router.get("/contact/:id", function(req, res) {
    if (!curuser || curuser == undefined) {
        res.redirect("/login");
    } else {
        console.log(req.params.id);
        if (req.params.id != undefined && req.params.id != null) {
            console.log(req.params.id);
            if (req.params.id == 1) {
                res.json({
                    phoneNumber: 7609176976
                });
            } else if (req.params.id == 2) {
                res.json({
                    phoneNumber: 5676968965
                });
            } else if (req.params.id == 3) {
                res.json({
                    phoneNumber: 5575588975
                });
            } else {
                res.send("Person not found")
            }
        } else {
            res.json({
                P1: {
                    phoneNumber: 7609176976
                },
                P2: {
                    phoneNumber: 5676968965
                },
                P3: {
                    phoneNumber: 5575588975
                }
            });
        }
    }
});
module.exports = router
