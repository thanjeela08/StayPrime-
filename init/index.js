const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(res=>{
    console.groupCollapsed("Database connected");
}).catch(err=>console.log(err));

async function main() {

     await mongoose.connect("mongodb://127.0.0.1:27017/stayPrime");
}


const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
    ...obj,
    owner:"695e7a1db92cae633170b7e0"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
};

initDB();