const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const Listing  = require("./models/listing.js")
const path  = require("path");
const methodOverride  = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/travelnest";

main().then(() => {
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/", (req,res) => {
    res.send("Welcome to your home page!");
})


// INDEX ROUTE
app.get("/listings" , async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

//NEW ROUTE
app.get("/listings/new" , async (req,res) => {
    res.render("listings/new.ejs");
})

//SHOW ROUTE
app.get("/listings/:id", async (req,res) => {
    let {id}  = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs" , {listing});
})

//CREATE ROUTE
app.post("/listings", async (req,res) => {
    const newListing  = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//EDIT ROUTE
app.get("/listings/:id/edit", async (req,res) => {
    let {id}  = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing})
})

//UPDATE ROUTE
app.put("/listings/:id", async(req,res) => {
    let {id}  = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//DELETE ROUTE
app.delete("/listings/:id" , async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

})


app.listen(8080, () => {
    console.log("Server has started!")
})



// BEFORE CREATING ANY ROUTES , A SAMPLE TESTING CODE TO SEE IF DATA IS BEING INSERTED IN THE DATABASE.
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