const express = require('express')
const apiCourses = require('./api-courses')
const app = express()

app.use(express.json());

app.use('/api/courses', apiCourses)

app.get('/', (req, res) => {
    res.send("Welcome to the Courses App")
})

app.listen(3000, () => console.log("Listening on port 3000..."))