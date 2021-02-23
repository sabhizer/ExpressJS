//joi returns a class, hence const is "Joi". Joi is used for data/input validation.
const Joi = require('joi')
const express = require('express')

const app = express()

//to parse json object in body of request.
app.use(express.json());
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
    {id: 4, name: "course4"}
]

//dummy route.
app.get('/', (req, res) => {
    res.send("Welcome to the Courses App")
})

//Get list of all courses. CRUD - Read
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

//Get a specific course. CRUD - Read
app.get('/api/courses/:id', (req, res) => {
    courses.find((item) => {
        if(item.id === parseInt(req.params.id)) {
        res.send(item)
    }})
    //404 Object not found
    res.status(404).send("The course Id does not exist.")
})

//Either of Above or below will run. Both does same thing.
    // const course = courses.find(item => item.id == req.params.id);
    // console.log(course)
    // if (!course) {
    //     res.status(404).send("The course Id does not exist.")
    // }
    // res.send(course)
// })



//Add a new course. CRUD - Create
//Command to send POST request : curl --location --request POST 'http://localhost:3000/api/courses' --header "Content-Type: application/json" --data '{"name":"course5"}
//OR
//curl --location --request POST 'http://localhost:3000/api/courses' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "name": "new course"
// }'
app.post('/api/courses', (req, res) => {
    //Input Validation
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }
    // Joi.ValidationError()

    //Self Input validation without using any library.
    if (!req.body.name || req.body.name.length < 3){
        //400 Bad Request
        res.status(400).send("Course name not provided or invalid. Name is required and should be min 3 characters.")
        return;
    }

        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        console.log(req.body)
        courses.push(course)
        //res.send(`Course ${req.body.name} added successfully`)
        res.send(course)

})

//Update existing course. CRUD - Update
app.put('/api/courses/:id', (req, res) => {
    //Lookup if id exists.
    //if id does not exist return 404
    //if id exist, validate new course name.
    //if course name not valid, return 400 - Bad request.
    //if course name valid, update course.
    //Return updated course.
    const course = courses.find(item => item.id == req.params.id);
    console.log(course)
    if (!course) {
        res.status(404).send("The course Id does not exist.")
    }

    if (!req.body.name || req.body.name.length < 3){
        res.status(400).send("Course name not provided or invalid. Name is required and should be min 3 characters.")
        return;
    }

    course.name = req.body.name
    res.send(course)
})

//Delete existing course. CRUD - Delete
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(item => item.id == req.params.id);
    console.log(course)
    if (!course) {
        res.status(404).send("The course Id does not exist.")
    }
    
    index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})


app.listen(3000, () => console.log("Listening on port 3000..."))