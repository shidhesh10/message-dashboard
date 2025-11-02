const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {console.log("Connection Successful")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "Priya",
        to: "Neha",
        msg: "Hi, how are you?",
        created_at: new Date(),
    },
    {
        from: "Neha",
        to: "Preeti",
        msg: "hey, Where are you?",
        created_at: new Date(),
    },
    {
        from: "Preeti",
        to: "Ankush",
        msg: "Where are you bro?",
        created_at: new Date(),
    },
    {
        from: "Ankush",
        to: "Aakash",
        msg: "Preeti is looking for you?",
        created_at: new Date(),
    },
    {
        from: "Askash",
        to: "Priya",
        msg: "Why preeti is looking for me?",
        created_at: new Date(),
    },
]

Chat.insertMany(allChats);

