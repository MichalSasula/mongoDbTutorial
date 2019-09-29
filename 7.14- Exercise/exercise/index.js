const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coursesExercise')
    .then(()=>{console.log('Connected to MongoDb...')})
    .catch(err => console.log('could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const CourseExample = mongoose.model('CourseExample', courseSchema);

async function createCourse(course){
    const course = new CourseExample(course);
    const result = await course.save();
    console.log(result);
}




async function getCourses(){
    const courses = await CourseExample
        .find()
        .sort({name: 1})
        .select({name: 1, author: 1})

    console.log(courses);
}


