// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// inserrt : for the variable u r going to accept 
//req and rep middleware function
let responseObject={}

app.get('/api/timestamp/:input',(request,response)=>{
  let input=request.params.input
  
  if(input.includes('-') || input.includes(' ')){
  //Date String
    responseObject['unix']=new Date(input).getTime()
    responseObject['utc']=new Date(input).toUTCString()
  }else{
    //TimesStamp
    input=parseInt(input)
    responseObject['unix']=new Date(input).getTime()
    responseObject['utc']=new Date(input).toUTCString()  
  }
  
  //error page
  if(!responseObject['unix'] || !responseObject['utc'])
  {
    response.json({error:'Invalid Date'})
  }
response.json(responseObject)
  
  })

app.get('/api/timestamp',(request,response)=>{
  responseObject['unix']=new Date().getTime()
  responseObject['utc']=new Date().toUTCString()
  response.json(responseObject)

})
