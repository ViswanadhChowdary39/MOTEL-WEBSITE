const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const App = require('express')();
var http = require('http').Server(App);

const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vishuchowdary399:nhv4xyNZuDNXM9mn@cluster0.irb7xtr.mongodb.net/");
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
};

connectDB();


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    Password: String
});


const user = mongoose.model("user", userSchema);

let EL = "";

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/HTML', (req, res) => {
    res.render("HTML");
});


app.get('/gallery', (req, res) => {
    res.render("gallery");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/rooms", (req, res) => {
    res.render("rooms");
});

app.get("/Sign", (req, res) => {
    res.render("login", { user: req.user });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect("/");
    });
});

app.post("/Sign", async (req, res) => {
    let { name, email, password } = req.body;
    let user_email = await user.findOne({ email: email });
    if (user_email) {
        res.send("Email Id is already registered");
    } else {
        const User1 = new user({
            name: name,
            email: email,
            Password: password
        });
        User1.save();
    }
    EL = email;
    res.redirect("HTML")
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email: email, Password: password});
    if (foundUser) {
        res.redirect("HTML");
    } else {
        res.send("Invalid Credentials");
    }

    EL = email;
});

app.listen(PORT, () => {
    console.log(`Server Running on mode on port ${PORT}`);
});