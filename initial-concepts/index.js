//below express is a function
const express = require('express')

//app is a object
const app = express()

//app.METHOD(PATH,CALLBACK)
// app.get()
// app.post()
// app.put() PUT is idempotent. PUT requests have no additional effect if they are called multiple times.
// app.delete()

app.get('/', (req, res) => {
    res.send('Hello World!!!')
    console.log("Called")
});

//get list of courses
app.get('/api/courses', (req, res) => {
    res.send([1,2,3])
})

//params is a object of all parameters passed. 
//Request : http://localhost:5000/api/blogs/2019/12
//Below eg will return -> {"year":"2019","month":"12"}
//list all blogs for specific month in a year
app.get('/api/blogs/:year/:month', (req, res) => {
    res.send(req.params)
})

//get specific course
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id)
})

//query string parameters. QSP are generally for optional parameters in the request.
//Request : http://localhost:5000/api/blogs/2019/12?sortby=name
//Below eg will return -> {"sortby":"name"}
app.get('/api/blogs/:year/:month', (req, res) => {
    res.send(req.query)
})

//take port from OS environment variable. If not available, use 3000.
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))


//=========================
//=========================


//app.route method. Better than above way, code is short and consise.

//either use bodyparser or express json.
const bodyparser = require('body-parser')
//When req body has content-type:text/plain <- This is a header.
app.use(bodyparser.text())
//When req body has content-type:application/json
app.use(bodyparser.json())
//Other way instead of using bodyparser.
//app.use(express.json());

app.route('/:username')
    .get((req,res)=>{
  res.send('Welcome to home ' + req.params.username)
})
    .post((req,res)=>{
  res.send('data is sent and processed')
})

app.route('/cat/:username')
    .get((req,res)=>{
      res.send('Welcome to the cats page! ' + req.params.username)
})
   .post((req,res)=>{
      res.send('data is sent and processed : ' + JSON.stringify(req.body))
      //Both works
      //res.send(req.body)
})

app.route('/rabbits/:username')
    .get((req,res)=>{
      res.send('welcome to the rabbits page, ' + req.params.username)
})
  .post((req,res)=>{
      res.send('data processed ' + req.params.username)
})