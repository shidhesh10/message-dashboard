const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.use(express.json());


main().then(() => {console.log("Connection Successful")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

//Index Route

app.get("/chats",async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
});

let chat1 = new Chat({
    from: "Priya",
    to: "Neha",
    msg: "Send me your notes",
    created_at: new Date(),
})

// chat1.save().then((res) => {
//     console.log(res);
// });

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// New route
app.get("/chats/new", (req, res) => {
    res.send("New Chat");
})

//Create Route
app.get("/chats", (req, res) => {
    res.send("Message sent");
});

app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

app.post("/chats", (req, res) => {
    let  {from, to, msg} = req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date(),
    })

    newChat.save().then((result) => {
        console.log(`Chat was saved: ${result}`);
        res.redirect("/chats");
    }).catch((err) => {
        console.log(err);
        res.send("Error in saving message")
    })

    
});

app.put("/chats/:id",async (req, res) => {
    let {id} = req.params;
    let {newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidator: true, new:true });
    res.redirect("/chats");
    console.log(updatedChat);
    console.log(newMsg);
})

//Destroy route
app.delete("/chats/:id",async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080.");
});