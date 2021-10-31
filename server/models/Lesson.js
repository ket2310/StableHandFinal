const { Schema, model } = require('mongoose');
const riderSchema = require('./Rider');
const instructorSchema = require('./Instructor');
const horseSchema = require('./Horse');

const lessonSchema = new Schema(
    {
        lessonDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        timeSlot: {
            type: String,
            required: true
        },
        rider:   {
            type: Schema.Types.ObjectId,
            ref: 'Rider'
          },
        instructor:   {
            type: Schema.Types.ObjectId,
            ref: 'Instructor'
          },
        horse:   {
            type: Schema.Types.ObjectId,
            ref: 'Horse'
          },
    }, {
    timestamps: true,
}
);

const Lesson = model('Lesson', lessonSchema);

module.exports = Lesson;

