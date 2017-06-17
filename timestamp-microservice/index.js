var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){
    res.render('homepage');
});

app.get('/:timestamp', function(req, res){
    if(!isNaN(req.params.timestamp) && 
         parseInt(Number(req.params.timestamp)) == req.params.timestamp && 
         !isNaN(parseInt(req.params.timestamp, 10))) {
        var n = req.params.timestamp;
        var d = new Date(n*1);
        d = formatDate(d);
    }
    else {
        var d = new Date(req.params.timestamp);
        if(isNaN(d)) {
            d = "null";
            n = "null";
        }
        else {
        var n = d.getTime();
        d = formatDate(d);
        }
    }
    
    res.render('timestamp', {
       naturalTime: d,
       unixTime: n
   });
});

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ", " + year;
}

app.listen(process.env.PORT);