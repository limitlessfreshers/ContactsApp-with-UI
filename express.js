var express=require('express');
var app=express();
const bodyParser= require('body-parser');
app.set('view engine','ejs');
var hostname='127.0.0.1';
var port=3000;
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var db;
MongoClient.connect('mongodb://127.0.0.1:27017',function(err, database){  
    if (err) return console.log(err)
    db = database;
    app.listen(3000, () => {
      console.log('listening on 3000');
    });
    console.log("tested");
  });
  app.use(bodyParser.urlencoded({extended: true}));
  
  app.get('/',(req,res)=>{
    res.sendFile('D:/node_js/hello.html');
  });

app.get('/view',(req,res)=>{
   
    db.collection('quotes').find().toArray(function(err,result){
        res.render('index.ejs',{quotes:result});
        
  });
   
});


app.get('/del',(req,res)=>{

   var fname=req.param("fname")
   var myquery = { firstname: fname};
   
   console.log(myquery);
    db.collection("quotes").remove(myquery, function(err, obj) {
        res.redirect('/view');
         
   });
    
 });

  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err);
  
      console.log('saved to database');
   //   res.send('saved to database');
    res.redirect('/view');
    });

 
  });
  //app.set('view engine','ejs');
  

/*
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

 
  app.post('/add',function(req,res){

    console.log('for posting the data'+req.body);
    
    res.sendFile('D:/node_js/hello.html');
});



app.get('/search',function(req,res){
    console.log('for getting the data');
    res.send('this is get method');
});

app.post('/add',function(req,res){
    console.log('for posting the data'+req.body);
    res.send('this is post method'+req.body);
});

app.delete('/del',function(req,res){
    console.log('for deleting the data');
    res.send('this is delete method');
});

var server=app.listen(port ,(req,res)=>{
    console.log('Connecting to server');
});
*/
