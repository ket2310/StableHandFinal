const moment = require('moment');

const findDateOfLesson = (day, date) => {
    let newDay = null;

    switch (day) {
        case "Tu":
            newDay = moment(date, "MM/DD/YYYY").add(0, "d");
            break;
            
        case "We":
            newDay = moment(date, "MM/DD/YYYY").add(1,"d");
            break;

        case "Th":
            newDay = moment(date, "MM/DD/YYYY").add(2,"d");
            break;

        case "Fr":
            newDay = moment(date, "MM/DD/YYYY").add(3,"d");
            break;

        case "Sa":
            newDay = moment(date, "MM/DD/YYYY").add(4,"d");
            break;

        case "Su":
            newDay = moment(date, "MM/DD/YYYY").add(5,"d");
            break;
        
        default:
            newDay = moment(date, "MM/DD/YYYY").add(0,"d");
            break;

    }
    return newDay.format("MM/DD/YYYY");
}


module.exports = findDateOfLesson;