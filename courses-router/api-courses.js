const express = require('express')
const router = express.Router()

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
    {id: 4, name: "course4"}
]

//Middleware working incorrectly as of now.
// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log(JSON.stringify(req.params.id), ' - Time: ', Date.now())
//     next()
//   })

router.get('/' ,(req, res) => {
    res.send(courses)
})

router.post('/', (req, res) => {
    if (!req.body.name || req.body.name.length < 3){
        res.status(400).send("Course name not provided or invalid. Name is required and should be min 3 characters.")
        return;
    }

        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        console.log(req.body)
        courses.push(course)
        res.send(course)

})

router.get('/:id' ,(req, res) => {
    const course = courses.find(item => item.id == req.params.id);
    console.log(course)
    if (!course) {
        res.status(404).send("The course Id does not exist.")
        return;
    }
        res.send(course)
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const course = courses.find(item => item.id == req.params.id);
    console.log(course)
    if (!course) {
        res.status(404).send("The course Id does not exist.")
        return;
    }
    
    index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})

module.exports = router