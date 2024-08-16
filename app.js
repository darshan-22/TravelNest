const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const Listing  = require("./models/listing.js")
const path  = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/travelnest";

main().then(() => {
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.get("/", (req,res) => {
    res.send("Welcome to your home page!");
})


// INDEX ROUTE
app.get("/listings" , async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})



app.listen(8080, () => {
    console.log("Server has started!")
})


// app.get("/testlisting", async (req,res) => {
//     //creating a document to be inserted in the db
//     let sampleListing = await new Listing({
//         title:"Premium Villa",
//         description :"Luxurious duplex villa with plush greenery and night life.",
//         price: 10000,
//         location:"Calangute , Goa",
//         country:"India",
//     });

//    await sampleListing.save();
//    console.log("sample listing was saved");
//    res.send("Success Testing");
// })