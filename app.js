var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var bodyparser = require('body-parser');
var fs = require('fs');

app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(bodyparser());

app.get('/', function(req,res){
    res.render('index');
});

app.get('/loadscores', function(req,res){
    res.render('load');
});

app.post('/postscores', function(req,res){
    console.log(req.body);
    fs.readFile(__dirname + '/scores.json', 'utf-8', function(err, data) {
        if (err) console.log(err)
    
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.push({
            username: req.body.username,
            highscore: req.body.highscore
        });
    
        console.log(arrayOfObjects)
    
        fs.writeFile(__dirname + '/scores.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
});

app.get('/highscore', function(req,res){
    console.log(__dirname + "/views/index.handlebars");
    res.sendFile(__dirname + "/scores.json");
});

app.listen(3000, function(){
    console.log("3000 running");
});