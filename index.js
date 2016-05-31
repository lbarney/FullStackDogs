 var dogs = [{ //data reserve
  name: "Fido",
  breed: "Doberman"
},
{
  name: "Toby",
  breed: "Beagle"
},
{
  name: "Max",
  breed: "Bulldog"
}];

var express = require('express');//makes coding node way nicer
var cors = require('cors'); // Takes care of headers
var bodyparser = require('body-parser'); // parses objects into json format

var app = express(); //run express

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());  //utf 8 encoding 
app.use(express.static(__dirname + '/public')); // go to public folder in nodeproj1

//app.get('/url', function(req, res, next){next();}), function(req, res, next){}

app.get('/dogs', function(req, res, next){ //coresponding endpoint for a $.ajax({method: Get, url: "/dogs"}) on the front end.
	res.send(dogs);

}); 
app.post('/dogs', function (req, res, next) {
	 dogs.push(req.body);
	 res.send(dogs); 
});


app.put('/dogs/:id', function(req, res,next){
	for(var i = 0; i < dogs.length; i++){
		if(req.params.id === dogs[i].name){
			dogs[i] = req.body;
		}
	}
	res.send(dogs);
});
app.delete('/dogs/:id', function (req, res, next) {
	 var found =false;
	 for(var i = 0; i < dogs.length; i++){
		if(req.params.id === dogs[i].name){
			dogs.splice(i, 1);
			found = true;
		}
	}
	if (found){
	res.send(dogs);
	}else{
	res.send('Id not found. Object not found');		
	}
});





app.listen(8080, function(){
	console.log('Listening on port 8080');
});