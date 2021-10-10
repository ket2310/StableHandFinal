const convertDay = (day) => {
    let newDay = null;

    switch (day) {
        case "Tu":
            newDay = "Tuesday";
            break;

        case "We":
            newDay = "Wednesday";
            break;

        case "Th":
            newDay = "Thursday";
            break;

        case "Fr":
            newDay = "Friday";
            break;

        case "Sa":
            newDay = "Saturday";
            break;

        case "Su":
            newDay = "Sunday";
            break;
        
        default:
            newDay = "Tuesday";
            break;

    }
    return newDay;
}


module.exports = convertDay;