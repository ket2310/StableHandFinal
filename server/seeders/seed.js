const db = require('../config/connection');
const { User, Rider, Instructor, Horse, Lesson } = require('../models');
const userSeeds = require('./users.json');
const riderSeeds = require('./riders.json');
const instructortSeeds = require('./instructors.json');
const horseSeeds = require('./horses.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Rider.deleteMany({});
        await Horse.deleteMany({});
        await Instructor.deleteMany({});
        await Lesson.deleteMany({})

        await User.create(userSeeds);
        await Rider.create(riderSeeds);
        await Horse.create(horseSeeds);
        await Instructor.create(instructortSeeds);
        
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});
