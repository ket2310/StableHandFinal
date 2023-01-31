import React, { useState } from "react";
import "../styles/lesson.css"
import findDateOfLesson from "../utils/findDateOfLesson";
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_HORSES, QUERY_RIDERS, QUERY_INSTRUCTORS, QUERY_LESSONS} from "../utils/queries";
import { BOOK_LESSON } from "../utils/mutations";
import convertHour from "../utils/convertHour";

//const moment = require('moment');
var idRider = null;
var idInstructor = null;
var idHorse = null;

function LessonForm(props) {
    const weekOfDate = props.weekOf.format("MM/DD/YYYY");
    const lessonDay = props.lessonDay;
    const bookedDate = findDateOfLesson(lessonDay, weekOfDate).toString();
    
    const timeSlot = props.timeSlot + bookedDate.replace(/\//g, "");
 
    const startTime = props.lessonHour;

    let duration = 1;
    const { data: rdata } = useQuery(QUERY_RIDERS);
    const { data: idata } = useQuery(QUERY_INSTRUCTORS)
    const { data: hdata } = useQuery(QUERY_HORSES)

    const riders = rdata?.riders || [];
    const instructors = idata?.instructors || [];
    const horses = hdata?.horses || [];

    const { data } = useQuery(QUERY_LESSONS);
    const lessons = data?.lessons || [];
    console.log(lessons)
    const ts = props.timeSlot + bookedDate.replace(/\//g, ""); // "Su0900 + 12052021"
    console.log(ts)
    const lessonBooked = lessons.find(lesson => lesson.timeSlot === ts);
    //console.log(lessonBooked + " IN LESSON FORM")
    const [bookLesson] = useMutation(BOOK_LESSON);

    const handleDuration = (e) => {
        e.preventDefault();
        duration = parseInt(e.target.value)
    }


    const handleInputChange = (e) => {
        console.log("Contents of lesson")
        console.log (props.riderLesson)
        // Getting the value and name of the input which triggered the change
        //const { name, value } = e.target;
    };

    const handleRiderChange = (e) => {
        idRider = e.target.value;
    };

    const handleInstructorChange = (e) => {
        idInstructor = e.target.value;
    };

    const handleHorseChange = (e) => {
        idHorse = e.target.value;
    };

    const handleFormSubmit = async () => {

        const objRider = riders.find(rider => rider._id === idRider);        
        //setRider(riders.find(rider => rider._id === idRider));

        const objInstructor = instructors.find(instructor => instructor._id === idInstructor);
        const objHorse = horses.find(horse => horse._id === idHorse);
        console.log(objHorse)
        try {
            const { data } = await bookLesson({
                variables: {
                    lessonDate: bookedDate,
                    startTime: startTime,
                    duration: duration,
                    timeSlot: timeSlot,
                    rider: {
                        _id: objRider._id,               
                  },
                    instructor: {
                        _id: objInstructor._id,
                        firstName: objInstructor.firstName,
                        lastName: objInstructor.lastName
                    },
                    horse: { _id: objHorse._id, name: objHorse.name }

                },
            });

            //props.riderLesson.rider.firstName = data.rider.firstName
            //props.riderLesson.rider.lastName = data.rider.lastName
            console.log(props.riderLesson)
            document.getElementById(props.timeSlot).text = "Testing..." + objRider.firstName + " " + objRider.lastName;
        } catch (err) {
            console.error(err);
        }
        props.setTrigger(false)
    }
    return (props.trigger) ? ((props.riderLesson) ? (
        <div className="popup">
            <div className="popup-content">
                <h3>{props.riderLesson.rider.firstName}</h3>
                <span className="close-btn" onClick={() => props.setTrigger(false)}>
                    Close</span>
                {props.children}
                <form className="lessonForm">
                    <div>
                        <label> Date:</label>&nbsp;
                        <input
                            text = {bookedDate}
                            // text={props.riderLesson.rider.lessonDate}
                            //value={bookedDate}
                            name="bookedDate"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Lesson Date"
                        />
                    </div>
                    <div>
                        <label> Time:</label>&nbsp;
                        <input
                            value={props.riderLesson.rider.startTime}
                            name="startTime"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Start Time"
                        />
                    </div>
                    <div>
                    <label>Rider: </label>&nbsp;
                        <select onChange={handleRiderChange}>
                        <option defaultValue>{props.riderLesson.rider.firstName + " " + props.riderLesson.rider.lastName}</option>
                            {riders && riders.map((rider) =>
                                (<option value={rider._id} key={rider._id}>{rider.firstName + " " + rider.lastName}</option>))}
                        </select>
                        {/*  <select onChange={handleRiderChange}>
                            <option value="Rider"> -- Select a Rider -- </option>
                            {riders && riders.map((rider) =>
                                (<option value={rider._id} key={rider._id}>{rider.firstName + " " + rider.lastName}</option>))}
                        </select> */}
                    </div>
                    <div>
                        <label>Instructor: </label>&nbsp;
                        <select onChange={handleInstructorChange}>
                            <option defaultValue>{props.riderLesson.instructor.firstName + " " + props.riderLesson.instructor.lastName} </option>
                            {instructors && instructors.map((instructor) =>
                                (<option value={instructor._id} key={instructor._id}>{instructor.firstName + " " + instructor.lastName}</option>))}
                        </select></div><div>
                        <label>Horse: </label>&nbsp;
                        <select onChange={handleHorseChange}>
                        <option defaultValue>{props.riderLesson.horse.name}</option>
                            {horses && horses.map((horse) =>
                                (<option value={horse._id} key={horse._id}>{horse.name}</option>))}
                        </select>
                    </div>
                    <div> <label>Duration</label>&nbsp;
                        <select onChange={handleDuration}>
                            <option value="1">1 hour</option>
                            <option value="30">30 minutes</option>
                        </select>
                    </div>
                    <button type="button" id="bookTime"
                        onClick={() => handleFormSubmit()}>
                        Submit
                    </button>
                </form>

            </div>
        </div>
    ) :
        (<div className="popup">
            <div className="popup-content">
                <h3>{props.message}</h3>
                <span className="close-btn" onClick={() => props.setTrigger(false)}>
                    Close</span>
                {props.children}
                <form className="lessonForm">
                    <div>
                        <label> Date:</label>&nbsp;
                        <input
                            value={bookedDate}
                            name="bookedDate"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Lesson Date"
                        />
                    </div>
                    <div>
                        <label> Time:</label>&nbsp;
                        <input
                            value={convertHour(startTime)}
                            name="startTime"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Start Time"
                        />
                    </div>
                    {/* <div>
                        <label> End:</label>&nbsp;
                        <input
                            value={convertHour(endTime)}
                            name="End Time"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="End Time"
                        />
                    </div> */}
                    <div>
                        <label>Rider: </label>&nbsp;
                        <select onChange={handleRiderChange}>
                            <option value="Rider"> -- Select a Rider -- </option>
                            {riders && riders.map((rider) =>
                                (<option value={rider._id} key={rider._id}>{rider.firstName + " " + rider.lastName}</option>))}
                        </select>
                    </div>
                    <div>
                        <label>Instructor: </label>&nbsp;
                        <select onChange={handleInstructorChange}>
                            <option value="Instructor"> -- Select an Instructor -- </option>
                            {instructors && instructors.map((instructor) =>
                                (<option value={instructor._id} key={instructor._id}>{instructor.firstName + " " + instructor.lastName}</option>))}
                        </select></div><div>
                        <label>Horse: </label>&nbsp;
                        <select onChange={handleHorseChange}>
                            <option value="Horse"> -- Select a Horse -- </option>
                            {horses && horses.map((horse) =>
                                (<option value={horse._id} key={horse._id}>{horse.name}</option>))}
                        </select>
                    </div>
                    <div> <label>Duration</label>&nbsp;
                        <select onChange={handleDuration}>
                            <option value="1">1 hour</option>
                            <option value="30">30 minutes</option>
                        </select>
                    </div>
                    <button type="button" id="bookTime"
                        onClick={() => handleFormSubmit()}>
                        Submit
                    </button>
                </form>

            </div>
        </div>
        )) : "";
}

export default LessonForm;
