var express = require('express')
var app = express()
const PORT = 3000

var ejs = require('ejs')
app.set('view engine', 'ejs');

// Database configuration using mongoose
var mongoose = require('mongoose')
var mongoDB = 'mongodb://localhost/mask'
var mongoOption = {
    useUnifiedTopology: true, 
    useNewUrlParser: true
}
mongoose.connect(mongoDB, mongoOption)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', () => {
    console.log('DB is connected on: ', mongoDB);
})

// importing models
var model = require('./schema')
var nationalCodeModel = model.model

// body-parser configuration to parse the request data 
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/submit', (req, res) => {
    var nationalCode = req.body.nationalCode
    var creationDate = req.body.creationDate
   
    query = {'nationalCode': nationalCode}
    nationalCodeModel.find(query, (err, success) => {
        if (err) {
            console.log('error:', err)
        }
        else if (success.length == 0){
            nationalCodeModel.create({
                nationalCode: nationalCode,
                creationDate: creationDate
            })
            console.log('salam khoshgele daei!')
            res.redirect('/khoshgeledaei')
        }
        else if (success.length > 0) {
            console.log('lashkhor detected')
            res.redirect('/lashkhor')
        }
    })

})

app.get('/lashkhor', (req, res) => {
    console.log('here')
    res.send('salam')
})

app.get('/list', (req, res) => {
    nationalCodeModel.find({}, (err, data) => {
        if (data) {
            res.render('list', {datas: data})
        }
    })
})


app.listen(PORT, () => {
    console.log(`Hey there! I\'m listening on port: ${PORT}`)
})

