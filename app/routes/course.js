// routes/Courses.js
const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');

module.exports =()=>{
    router.post('/', CourseController.createCourse);
    router.get('/', CourseController.getCourses);
    router.post("/assign_course",CourseController.assignCourseToUser)
    router.get('/:id', CourseController.getCourse);
    router.patch('/:id', CourseController.updateCourse);
    router.delete('/:id',CourseController.deleteCourse);
    
    return router
}