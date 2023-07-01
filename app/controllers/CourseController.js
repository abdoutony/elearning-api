// controllers/CourseController.js
const CourseService = require('../services/course');

exports.createCourse = async (req, res) => {
  try {
    console.log("h")
    const create = await CourseService.create(req.body);
    return res.status(201).json({msg:"Create with success" ,create:create});
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const gets = await CourseService.gets();
    return res.status(200).json({ msg:"Get with success" ,gets:gets });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const get = await CourseService.get(req.params.id);
    return res.status(200).json({ msg:"Get with success" ,get:get });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const update = await CourseService.update(req.params.id, req.body);
    return res.status(200).json({ msg:"update with success" ,update:update });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}

exports.deleteCourse = async (req, res) => {
    try {
      await CourseService.delete(req.params.id);
      return res.status(200).json({ msg:"Deleted succefully" });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  exports.assignCourseToUser = async(req,res)=>{
    try{
      const course_user = await CourseService.assignCourseToUser(req.body)
      return res.status(200).json({ msg:"Course assigned to user successfully"
       ,course_user });
    }catch(error){
      return res.status(500).json({ error: error.message });
    }
  }