const mongoose = require("mongoose");

let listingSchema = new mongoose.Schema({
    title:String,
    description:String,
    image:String,
    price:Number,
    location:String,
    country:String,
});

const Listing = new mongoose.model("Listing", listingSchema);
modules.export = Listing;
