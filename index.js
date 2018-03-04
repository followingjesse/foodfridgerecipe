var app = require('express')();
var http = require('http').Server(app);
var hbs = require('hbs');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database('food.db');
var rdb = new sqlite3.Database('recipe.db');
var recipingred = [];
var recip = [];
var numingred = [];
var insertedrecip = [];
var recipyoucancook = [];
app.set('view engine','html');
app.engine('html',hbs.__express);

app.get('/', function(req,res) {
	var messages = JSON.parse(
		fs.readFileSync('messages.json','utf8')
		);	 
    	res.render(__dirname + '/index.html', {
		'welcomeMessage': 'Hello Starterhacks',
		'messages' : messages
	});
});    	

app.get('/message',function(req,res){
	var ingredient1 = (req.query.name);
    var expiry2 = (req.query.message);
    var sql = `INSERT INTO fooddb (amount,ingredient,dish,expiry) VALUES(1,'${ingredient1}','None','${expiry2}')`;
    db.run(sql,function(err){
    	if (err) {
    		return console.log(err.message);
    	}
        insertedrecip.push(ingredient1);
    	console.log('A row has been inserted');
    	
    });    	
    res.redirect('/'); 
	//var messages = JSON.parse(fs.readFileSync('messages.json','utf8'));
	//messages.push(req.query);
	//fs.writeFileSync('messages.json',JSON.stringify(messages));
	//res.redirect('/');
});

app.get('/check', function(req,res){
	//var recipingred = [];
	//var recip = [];
	//var numingred = [];
    rdb.all('SELECT * from recipedb',function(err,rows){
    if(err){
    	return console.log(err.message);
    }else {
        
        for (var i = 0;i < rows.length; i++) {
          recipingred.push(Object.values(rows[i])[0]);
          recip.push(Object.values(rows[i])[1]);
          numingred.push(Object.values(rows[i])[2]);
        }   
   // console.log(recipingred);
    //console.log(recip);
    //console.log(numingred);
    var counter = 0;
    for(var x = 0;x<recipingred.length;x++){
    	//console.log('in loop1');
    	var bigstring = recipingred[x];
        for(var y = 0;y<insertedrecip.length;y++){
        //	console.log('in loop2');
        var smallstring = insertedrecip[y];
        var s = `counter is ${counter}`;
        //console.log(s);
		if(bigstring.indexOf(smallstring) !== -1){
		//	console.log('found match');
			 var s = `counter is ${counter}`;
        //console.log(s);
          	if(counter == numingred[x]){
          	//	console.log('max match');
          		 var s = `counter is ${counter}`;
          //       console.log(s);
          		recipyoucancook.push(recip[x]);
          		counter = 0;
          		break;
          	}else{
          		 var s = `before counter is ${counter}`;
        //console.log(s);
          		counter++;
          		 var s = `after counter is ${counter}`;
        //console.log(s);
          	}
		}else if(counter == numingred[x]){
			//console.log('max match');
          		 var s = `counter is ${counter}`;
          //       console.log(s);
          		recipyoucancook.push(recip[x]);
          		counter = 0;
          		break;
		}        	
        }
        if(counter == numingred[x]){
		//	console.log('max match');
          		 var s = `counter is ${counter}`;
        //         console.log(s);
          		recipyoucancook.push(recip[x]);
          		counter = 0;
    
		}
		counter = 0;
//string.indexOf(substring) !== -1;
    }
      //console.log(recipyoucancook.length);
      //console.log(insertedrecip);
     if(recipyoucancook.length == 0){
     	console.log('no recipes :(');
     }else if (recipyoucancook.length > 0){
     	console.log(recipyoucancook);
     }


    }
});
    res.redirect('/');
});
http.listen(3000, function() {
	console.log("listening on port 3000");
})
//db.close();
//const id = req.params.id

//$.get


//res.send

