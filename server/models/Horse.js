const { Schema, model } = require('mongoose');


const horseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        lessonCount: {
            type: Number,
            required: true,
        },
        lessonLimit: {
            type: Number,
            required: true,
        },
    }, {
    timestamps: true,
}
);

const Horse = model('Horse', horseSchema);

module.exports = Horse;

