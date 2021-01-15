const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));



//API KEY pk_c48fba1f8ea44478b29078336cde659b
//create call API function
function callAPI(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=pk_c48fba1f8ea44478b29078336cde659b', {json:true}, (err, res, body) => {
        if (err) {return console.log(err);}
        if (res.statusCode === 200) {
            //console.log(body);
            finishedAPI(body);
        }
    });
}

//Set handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherStuff = "This is other stuf...";

//Set handlebar index GET route
app.get('/', function (req, res) {
    callAPI(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });        
    }, "fb");
});


//Set handlebar index POST route
app.post('/', function (req, res) {
    callAPI(function(doneAPI) {
//        posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
//            posted_stuff: posted_stuff;
        });        
    }, req.body.stock_ticker);
});


//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');  
});


// Set static folder
app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT,() => console.log("Server listening to port " + PORT));