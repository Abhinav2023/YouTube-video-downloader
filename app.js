var express=require("express");
var app=express();
var bodyParser  =   require("body-parser");
const cors = require('cors');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg   = require('fluent-ffmpeg');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above


app.get("/",(req,res)=>{
	res.send("Youtube video downloader");
})

app.get("/download",(req,res)=>{
	res.render("index");
});

app.post("/download",(req,res)=>{
	var url=req.body.url;
	console.log(url);
	
	
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	ytdl(url, {filter: (format) =>  format.container === 'mp4' && format.resolution ==='1080p'}).pipe(res);
	// ytdl(url,{
	// 	format: "mp4",
	// 	resolution: "720p"
	// })
	// .pipe(fs.createWriteStream('video.mp4'));

});


app.listen(3000,()=>{
	console.log("server is lisening");
});