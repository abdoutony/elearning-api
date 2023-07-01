// services/CourseService.js
const Course = require('../models/course');
const User = require('../models/user');
const CourseUser = require('../models/course_user')
exports.create = async (CourseData) => {
  try {
    const course = await Course.create(CourseData);
    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.gets = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.get = async (id) => {
  try {
    const course = await Course.findById(id);
    if (!course) throw new Error('Course not found');
    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (id, CourseData) => {
  try {
    const course = await Course.findByIdAndUpdate(id, CourseData, { new: true });
    if (!course) throw new Error('Course not found');
    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (id) => {
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) throw new Error('Course not found');
    return 'Course deleted';
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.assignCourseToUser = async(data)=>{
  try{
    const {user_id,course_id} = data
    const user = await User.findOne({_id:user_id})
    const course = await Course.findOne({_id:course_id})
    if(user && course){
      const course_user  = new CourseUser({
        user_id:user._id,
        course_id:course._id
      })
      const saved_course_user = await course_user.save()
      return saved_course_user
    }else{
      throw new Error("User or Course Not found");
    }
  }catch(error){
    throw new Error(error.message);
  }
}
