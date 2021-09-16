const express = require('express')

const app = express() 

const request = require('request')

const dotenv = require('dotenv')
dotenv.config()

//Middlewares
app.set("view engine" , "ejs")
app.use('/public' , express.static('public'))
app.get("/" , (req , res)=>{
    //res.send("Got your request")
    res.render("homepage.ejs")
})
app.get("/class" , (req , res)=>{
    res.send("Now we are in class")
})
app.get("/class/:name" , (req, res)=>{
    console.log(req.params)
    res.send( ` Now you are in ${req.params.name} class `)
})
app.get("/aboutme" , (req , res)=> {
    res.render("About Me")
})
app.get("/result", (req , res)=>{
    //console.log(req.query.movieName)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url , function (error , response , body){
        if(!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data)
            //res.send("Success")
            //res.render("homepage" , {movie: data})
            //res.send(data)
            res.render("result" , {movieData : data})
        }else {
            res.send("Error!!")
        }
    })
})
app.get("/result/:id", (req , res)=>{
    //console.log(req.query.movieName)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url , function (error , response , body){
        if(!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data)
            //res.send("Success")
            //res.render("homepage" , {movie: data})
            //res.send(data)
            //console.log(req)
            //res.send(data)
            res.render("Info" , {movieData : data})
        }else {
            res.send("Error!!")
        }
    })
})
//app.get("/result" , (req , res)=> {
    //console.log(req.query)
    //res.send("Data Received")
//})
app.get("*" , (req , res)=> {
    res.send("Uh oh something went wrong")
})
app.listen(process.env.PORT, ()=> {
    console.log(`Server has started at ${process.env.PORT}. WooHoo !!`)
})