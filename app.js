const express = require("express");

const app = express();

const db = require('./config/db');

app.get('/', async (req,res)=> res.send("Respon node js berhasil")); 

app.use(express.urlencoded({extended: true}));

db.authenticate().then(() => (console.log("Database connected")));

const User = require('./models/User');

app.post("/crud", async(req,res)=>{
    try {
        const {username,email,password} = req.body;

        const newUser = new User({
            username, email, password
        })
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

app.get("/get", async (req,res)=>{
    try {
        const getAllUser = await User.findAll({});
        res.json(getAllUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

app.get("/get/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const getUser= await User.findOne({
            where : {id:id}
        });
        res.json(getUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});


app.delete("/get/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const deleteUser= await User.destroy({
            where : {id:id}
        });
        res.json("berhasil dihapus");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});

app.put("/get/:id", async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        const id = req.params.id;
        const updateUser=await User.update({
            username,email,password
        }, {where : {id:id}});
        
        await updateUser;
        res.json("berhasil diupdate");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server eror");
    }
});


app.listen(4500, ()=> console.log("Port berjalan di 4500"));