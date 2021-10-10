const { Schema, model } = require('mongoose');

const instructorSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
  
    }, {
    timestamps: true,
}
);

const Instructor = model('Instructor', instructorSchema);

module.exports = Instructor;

