const express = require("express");
const app=express();
const bodyparser=require("body-parser");
const path=require("path")
const multer=require('multer') 
var docxConverter = require('docx-pdf');


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

app.use(express.static('upload'));
var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"upload");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    },
})
var upload=multer({storage:storage});



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/docxtopdf',upload.single('file'),(req,res)=>{
    let outputfilepath=Date.now()+"output.pdf"
docxConverter(req.file.path,outputfilepath,function(err,result){
  if(err){
    console.log(err);
  }
    else{
        res.download(outputfilepath,()=>{})
    }
});
})

app.listen(7000,()=>{
    console.log("Server is Running..")
})