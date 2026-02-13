if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const {MongoStore} = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./router/listings.js")
const reviewRouter = require("./router/reviews.js")
const userRouter = require("./router/user.js")

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const dbUrl = process.env.ATLASDB_URL;

main().then(res=>{
    console.log("Database connected");
}).catch(err=>console.log(err));



async function main() {

     await mongoose.connect(dbUrl);
}




const store = MongoStore.create({
   mongoUrl: dbUrl,
   crypto:{
    secret:process.env.MY_SECRET
   },
   touchAfter:24*3600,
});

store.on("error",(err)=>{
    console.log("ERROR in MONGO SESSION STORE",err)
});


app.use(
    session({
        store,
        name:"StayPrime",
        secret:process.env.MY_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"lax",
            maxAge:1000*60*60*24,
        },
    })
);




if(process.env.NODE_ENV==="production"){
    app.set("trust proxy",1)
}






app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async(req,res)=>{
//    let fakeUser = new User({
//     email:"student@gmail.com",
//     username:"student"
//    });
//    let  registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// })



app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter);

//error handling
app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {statusCode = 500,message="something went wrong"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
    next();
})

app.listen(8080,()=>{
    console.log(`app is listening on port 8080 `);
});

