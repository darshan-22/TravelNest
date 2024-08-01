const express = require("express");
const app =express();
const mongoose  = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/travelnest";

main().then(() => {
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req,res) => {
    res.send("Welcome to your home page!");
})

app.listen(8080, () => {
    console.log("Server has started!")
})