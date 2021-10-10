const moment = require('moment');

const findDateOfLesson = (day, date) => {
    let newDay = null;

    switch (day) {
        case "Tu":
            newDay = moment(date, "MM/DD/YYYY").add("MM/DD/YYYY", 0);
            break;
            
        case "We":
            newDay = moment(date, "MM/DD/YYYY").add("MM/DD/YYYY", 1);
            break;

        case "Th":
            newDay = moment(date, "MM/DD/YYYY").add("MM/DD/YYYY", 2);
            break;

        case "Fr":
            newDay = moment(date, "MM/DD/YYYY").add("MM/DD/YYYY", 3);
            break;

        case "Sa":
            newDay = moment(date, "MM/DD/YYYY").add("MM/DD/YYYY", 4);
            break;

        case "Su":
            newDay = moment(date, "MM/DD/YYYY").add("MM/DD/YYYY", 5);
            break;
        
        default:
            newDay = moment(date, "MM/DD/YYYY").add("MM/DD/YYYY", 0);
            break;

    }
    return newDay;
}


module.exports = findDateOfLesson;