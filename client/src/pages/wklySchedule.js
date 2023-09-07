import React from "react";
import '../styles/timesheet.css'
import LessonForm from "../components/lessonForm";
import { useQuery } from '@apollo/client';
import findDateOfLesson from "../utils/findDateOfLesson";
import { QUERY_LESSONS } from "../utils/queries";
import { useState } from 'react';
import convertDay from "../utils/convertDay";
import convertHour from "../utils/convertHour";
import { weekdays, timeOfAppointment } from "../utils/helpers"

const moment = require('moment');

function WklySchedule() {
    const [weekOf, setWeekOf] = useState(moment().startOf('week').day('Tuesday'));
    const [weekMsg, setWeeOfMessage] = useState("Lesson Schedule for the week of " + weekOf.format("dddd, MMMM Do"))
    const [timeSlot, setTimeSlot] = useState('Tu0900');
    //const [openings, setOpenings] = useState([]);
    const [lessonDay, setDay] = useState('Tu');
    const [lessonHour, setHour] = useState('9:00')

    const [anchorPopup, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [riderLesson, setTimeForLesson] = useState(null);
    // const [lessonState, setLessonState] = useState(null)
    const { loading, data } = useQuery(QUERY_LESSONS);
    let lessons
    if (!loading) {
        lessons = data.lessons;
        // setLessonState(data.lessons)
        console.log("lessons", lessons)
    }

    let availability = null;

    const scheduleAlesson = (event) => {
        //alert('you are here!!!!!!!!!!!!!!')
        event.preventDefault();


        var tmp = event.target.id;
        var day = tmp.substr(0, 2);
        var hour = tmp.substr(2);

        if (checkIfavailable(tmp) === "Available") {
            setTimeForLesson(null);
            setTimeSlot(tmp);
            setDay(day);
            setHour(hour)
            setMessage(convertDay(day) + " " + convertHour(hour));
            setShow(true);
            // setTimeForLesson(lessonBooked);
        } else {
            //  We are editing a lesson with the 'ts' variable
            const weekOfDate = weekOf.format("MM/DD/YYYY"); // 11/30/2021
            const lessonDay = tmp.substr(0, 2); // "Tu"
            const bookedDate = findDateOfLesson(lessonDay, weekOfDate).toString(); // "12052021"
            const ts = tmp + bookedDate.replace(/\//g, ""); // "Su0900 + 12052021"

            const lessonBooked = lessons.find(lesson => lesson.timeSlot === ts);

            if (lessonBooked) {
                console.log('lessonbooked', lessonBooked);
                setTimeForLesson(lessonBooked);
                // console.log(lessonBooked)
            }

            setShow(true);

        }
    }

    function checkIfavailable(id) {  //  Here, id = "Tu0900"
        const weekOfDate = weekOf.format("MM/DD/YYYY"); // 11/30/2021
        const lessonDay = id.substr(0, 2); // "Tu"
        const bookedDate = findDateOfLesson(lessonDay, weekOfDate).toString(); // "12052021"
        const ts = id + bookedDate.replace(/\//g, ""); // "Su0900 + 12052021"

        const lessonBooked = lessons.find(lesson => lesson.timeSlot === ts);
        availability = "Available";
        if (lessonBooked)
            availability = lessonBooked.rider.firstName + " " + lessonBooked.rider.lastName;

        return availability;
    }

    function goForward() {
        setWeekOf(weekOf.add(7, "d"))
        setWeeOfMessage("Lesson Schedule for the week of " + weekOf.format("dddd, MMMM Do"));
        console.log(weekMsg);
    }

    function goBackward() {
        setWeekOf(weekOf.subtract(7, "d"))
        setWeeOfMessage("Lesson Schedule for the week of " + weekOf.format("dddd, MMMM Do"));
        console.log(weekMsg);
    }

    //Function takes in an index number from the timeOfAppointment and returns table data
    function makeSchedule(index) {
        return weekdays.map((day) => {
            let time = timeOfAppointment[index];
            let id = day.slice(0, 2) + time;
            return (
                <td key={id}>
                    <a
                        href="/"
                        id={id}
                        onClick={scheduleAlesson}>
                        {checkIfavailable(id)}
                    </a>
                </td>
            )
        })
    }
    return (
        <>
            {
                data ? (
                    <div className="app-container">
                        <div className="directional">
                            <button type="button" id="backward"
                                onClick={() => goBackward()}>
                                Last week
                            </button> &nbsp; &nbsp;
                            <p>{weekMsg}</p> &nbsp; &nbsp;
                            <button type="button" id="forward"
                                onClick={() => goForward()}>
                                Next week
                            </button>
                        </div>
                        <LessonForm
                            trigger={anchorPopup}
                            timeSlot={timeSlot}
                            setTrigger={setShow}
                            message={message}
                            weekOf={weekOf}
                            lessonDay={lessonDay}
                            lessonHour={lessonHour}
                            riderLesson={riderLesson}
                            lessons={lessons}
                        ></LessonForm>
                        <table>
                            <thead>
                                <tr>
                                    <th align="left">Time:</th>
                                    {weekdays.map((day) => <th key={day}>{day}</th>)}
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td rowSpan={2}><span>09:00</span></td>
                                    {makeSchedule(0)}
                                </tr>
                                <tr>
                                    {makeSchedule(1)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>10:00</span></td>
                                    {makeSchedule(2)}
                                </tr>
                                <tr>
                                    {makeSchedule(3)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>11:00</span></td>
                                    {makeSchedule(4)}
                                </tr>
                                <tr>
                                    {makeSchedule(5)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>12:00</span></td>
                                    {makeSchedule(6)}
                                </tr>
                                <tr>
                                    {makeSchedule(7)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>1:00</span></td>
                                    {makeSchedule(8)}
                                </tr>
                                <tr>
                                    {makeSchedule(9)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>2:00</span></td>
                                    {makeSchedule(10)}
                                </tr>
                                <tr>
                                    {makeSchedule(11)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>3:00</span></td>
                                    {makeSchedule(12)}
                                </tr>
                                <tr>
                                    {makeSchedule(13)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>4:00</span></td>
                                    {makeSchedule(14)}
                                </tr>
                                <tr>
                                    {makeSchedule(15)}
                                </tr>
                                <tr>
                                    <td rowSpan={2}><span>5:00</span></td>
                                    {makeSchedule(16)}
                                </tr>
                                <tr>
                                    {makeSchedule(17)}
                                </tr>
                            </tbody>

                        </table>


                    </div>) : <div>"loading..."</div>}
        </>
    );

}
export default WklySchedule