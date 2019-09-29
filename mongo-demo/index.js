const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to MongoDb...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    // const pageNumber = 2;
    // const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lte (less than or equal to)
    //in
    //nin (not in);

    const courses = await Course
        .find({author: 'Mosh',isPublished: true})
        // .find()
        // .or([{author: 'Mosh'},{isPublished: true}])
        // .find({price: {$gte: 10, $lte: 20}})
        // .find({price: {$in: [10,15,20]}})
        // .find({author: /^Mosh/})
        // .find({author: /Hamedani$/i})
        // .find({author: /.*Mosh.*/i})
        // .skip((pageNumber-1)*pageSize)
        // .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});
        // .count();
    console.log(courses);
}

getCourses();

