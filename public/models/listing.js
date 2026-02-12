const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema =  new Schema({
    title:{
      type:String,
      required:true
    },
    description:String,
    image:{
     type:String,
     default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fluxury-villa&psig=AOvVaw0HIfr5v9CFz33Sgs6VfZAM&ust=1764576700343000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNi5_s22mZEDFQAAAAAdAAAAABAE",
     set : (v)=>
        v===""?"https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fluxury-villa&psig=AOvVaw0HIfr5v9CFz33Sgs6VfZAM&ust=1764576700343000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNi5_s22mZEDFQAAAAAdAAAAABAE":v
     
    },
    price:Number,
    location:String,
    country:String
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;