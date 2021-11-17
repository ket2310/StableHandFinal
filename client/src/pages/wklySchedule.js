import React from "react";
import '../styles/timesheet.css'
import LessonForm from "../components/lessonForm";
import { useQuery } from '@apollo/client';
import findDateOfLesson from "../utils/findDateOfLesson";
import { QUERY_LESSONS } from "../utils/queries";
import { useState } from 'react';
import convertDay from "../utils/convertDay";
import convertHour from "../utils/convertHour";

const moment = require('moment');

export default function WklySchedule() {
    const [weekOf, setWeekOf] = useState(moment().startOf('week').day('Tuesday'));
    const [weekMsg, setWeeOfMessage] = useState("Lesson Schedule for the week of " + weekOf.format("dddd, MMMM Do"))
    const [timeSlot, setTimeSlot] = useState('Tu0900');
    const [lessonDay, setDay] = useState('Tu');
    const [lessonHour, setHour] = useState('9:00')

    const [anchorPopup, setShow] = useState(false)
    const [message, setMessage] = useState('')

    const { loading, data } = useQuery(QUERY_LESSONS);

    const lessons = data?.lessons || [];
  
    let availability = null;

    const scheduleAlesson = (event) => {
        //alert('you are here!!!!!!!!!!!!!!')
        event.preventDefault();
        var tmp = event.target.id;
        var day = tmp.substr(0, 2);
        var hour = tmp.substr(2);

        setTimeSlot(tmp);
        setDay(day);
        setHour(hour)
        setMessage(convertDay(day) + " " + convertHour(hour));
        setShow(true);


    }
    function checkIfavailable(id) {
        try {
      
            availability = "Available";
        } catch (err) {
            console.error(err);
        }
        return id;
    }

    return (
        <div className="app-container">
            <p>{weekMsg}</p>
            <LessonForm
                trigger={anchorPopup}
                timeSlot={timeSlot}
                setTrigger={setShow}
                message={message}
                weekOf={weekOf}
                lessonDay={lessonDay}
                lessonHour={lessonHour}
            ></LessonForm>
            <table>
                <thead>
                    <tr>
                        <th align="left">Time:</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <td rowSpan={2}><span>09:00</span></td>
                        <td><a href="/" id="Tu0900" onClick={scheduleAlesson}>{checkIfavailable("Tu0900")}</a></td>
                        <td><a href="/" id="We0900" onClick={scheduleAlesson}>{checkIfavailable("We0900")}</a></td>
                        <td><a href="/" id="Th0900" onClick={scheduleAlesson}>{checkIfavailable("Th0900")}</a></td>
                        <td><a href="/" id="Fr0900" onClick={scheduleAlesson}>{checkIfavailable("Fr0900")}</a></td>
                        <td><a href="/" id="Sa0900" onClick={scheduleAlesson}>{checkIfavailable("Sa0900")}</a></td>
                        <td><a href="/" id="Su0900" onClick={scheduleAlesson}>{checkIfavailable("Su0900")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0930" onClick={scheduleAlesson}>{checkIfavailable("Tu0930")}</a></td>
                        <td><a href="/" id="We0930" onClick={scheduleAlesson}>{checkIfavailable("We0930")}</a></td>
                        <td><a href="/" id="Th0930" onClick={scheduleAlesson}>{checkIfavailable("Th0930")}</a></td>
                        <td><a href="/" id="Fr0930" onClick={scheduleAlesson}>{checkIfavailable("Fr0930")}</a></td>
                        <td><a href="/" id="Sa0930" onClick={scheduleAlesson}>{checkIfavailable("Sa0930")}</a></td>
                        <td><a href="/" id="Su0930" onClick={scheduleAlesson}>{checkIfavailable("Su0930")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>10:00</span></td>
                        <td><a href="/" id="Tu1000" onClick={scheduleAlesson}>{checkIfavailable("Tu1000")}</a></td>
                        <td><a href="/" id="We1000" onClick={scheduleAlesson}>{checkIfavailable("We1000")}</a></td>
                        <td><a href="/" id="Th1000" onClick={scheduleAlesson}>{checkIfavailable("Th1000")}</a></td>
                        <td><a href="/" id="Fr1000" onClick={scheduleAlesson}>{checkIfavailable("Fr1000")}</a></td>
                        <td><a href="/" id="Sa1000" onClick={scheduleAlesson}>{checkIfavailable("Sa1000")}</a></td>
                        <td><a href="/" id="Su1000" onClick={scheduleAlesson}>{checkIfavailable("Su1000")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu1030" onClick={scheduleAlesson}>{checkIfavailable("Tu1030")}</a></td>
                        <td><a href="/" id="We1030" onClick={scheduleAlesson}>{checkIfavailable("We1030")}</a></td>
                        <td><a href="/" id="Th1030" onClick={scheduleAlesson}>{checkIfavailable("Th1030")}</a></td>
                        <td><a href="/" id="Fr1030" onClick={scheduleAlesson}>{checkIfavailable("Fr1030")}</a></td>
                        <td><a href="/" id="Sa1030" onClick={scheduleAlesson}>{checkIfavailable("Sa1030")}</a></td>
                        <td><a href="/" id="Su1030" onClick={scheduleAlesson}>{checkIfavailable("Su1030")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>11:00</span></td>
                        <td><a href="/" id="Tu1100" onClick={scheduleAlesson}>{checkIfavailable("Tu1100")}</a></td>
                        <td><a href="/" id="We1100" onClick={scheduleAlesson}>{checkIfavailable("We1100")}</a></td>
                        <td><a href="/" id="Th1100" onClick={scheduleAlesson}>{checkIfavailable("Th1100")}</a></td>
                        <td><a href="/" id="Fr1100" onClick={scheduleAlesson}>{checkIfavailable("Fr1100")}</a></td>
                        <td><a href="/" id="Sa1100" onClick={scheduleAlesson}>{checkIfavailable("Sa1100")}</a></td>
                        <td><a href="/" id="Su1100" onClick={scheduleAlesson}>{checkIfavailable("Su1100")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu1130" onClick={scheduleAlesson}>{checkIfavailable("Tu1130")}</a></td>
                        <td><a href="/" id="We1130" onClick={scheduleAlesson}>{checkIfavailable("We1130")}</a></td>
                        <td><a href="/" id="Th1130" onClick={scheduleAlesson}>{checkIfavailable("Th1130")}</a></td>
                        <td><a href="/" id="Fr1130" onClick={scheduleAlesson}>{checkIfavailable("Fr1130")}</a></td>
                        <td><a href="/" id="Sa1130" onClick={scheduleAlesson}>{checkIfavailable("Sa1130")}</a></td>
                        <td><a href="/" id="Su1130" onClick={scheduleAlesson}>{checkIfavailable("Su1130")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>12:00</span></td>
                        <td><a href="/" id="Tu1200" onClick={scheduleAlesson}>{checkIfavailable("Tu1200")}</a></td>
                        <td><a href="/" id="We1200" onClick={scheduleAlesson}>{checkIfavailable("We1200")}</a></td>
                        <td><a href="/" id="Th1200" onClick={scheduleAlesson}>{checkIfavailable("Th1200")}</a></td>
                        <td><a href="/" id="Fr1200" onClick={scheduleAlesson}>{checkIfavailable("Fr1200")}</a></td>
                        <td><a href="/" id="Sa1200" onClick={scheduleAlesson}>{checkIfavailable("Sa1200")}</a></td>
                        <td><a href="/" id="Su1200" onClick={scheduleAlesson}>{checkIfavailable("Su1200")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu1230" onClick={scheduleAlesson}>{checkIfavailable("Tu1230")}</a></td>
                        <td><a href="/" id="We1230" onClick={scheduleAlesson}>{checkIfavailable("We1230")}</a></td>
                        <td><a href="/" id="Th1230" onClick={scheduleAlesson}>{checkIfavailable("Th1230")}</a></td>
                        <td><a href="/" id="Fr1230" onClick={scheduleAlesson}>{checkIfavailable("Fr1230")}</a></td>
                        <td><a href="/" id="Sa1230" onClick={scheduleAlesson}>{checkIfavailable("Sa1230")}</a></td>
                        <td><a href="/" id="Su1230" onClick={scheduleAlesson}>{checkIfavailable("Su1230")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>1:00</span></td>
                        <td><a href="/" id="Tu0100" onClick={scheduleAlesson}>{checkIfavailable("Tu0100")}</a></td>
                        <td><a href="/" id="We0100" onClick={scheduleAlesson}>{checkIfavailable("We0100")}</a></td>
                        <td><a href="/" id="Th0100" onClick={scheduleAlesson}>{checkIfavailable("Th0100")}</a></td>
                        <td><a href="/" id="Fr0100" onClick={scheduleAlesson}>{checkIfavailable("Fr0100")}</a></td>
                        <td><a href="/" id="Sa0100" onClick={scheduleAlesson}>{checkIfavailable("Sa0100")}</a></td>
                        <td><a href="/" id="Su0100" onClick={scheduleAlesson}>{checkIfavailable("Su0100")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0130" onClick={scheduleAlesson}>{checkIfavailable("Tu0130")}</a></td>
                        <td><a href="/" id="We0130" onClick={scheduleAlesson}>{checkIfavailable("We0130")}</a></td>
                        <td><a href="/" id="Th0130" onClick={scheduleAlesson}>{checkIfavailable("Th0130")}</a></td>
                        <td><a href="/" id="Fr0130" onClick={scheduleAlesson}>{checkIfavailable("Fr0130")}</a></td>
                        <td><a href="/" id="Sa0130" onClick={scheduleAlesson}>{checkIfavailable("Sa0130")}</a></td>
                        <td><a href="/" id="Su0130" onClick={scheduleAlesson}>{checkIfavailable("Su0130")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>2:00</span></td>
                        <td><a href="/" id="Tu0200" onClick={scheduleAlesson}>{checkIfavailable("Tu0200")}</a></td>
                        <td><a href="/" id="We0200" onClick={scheduleAlesson}>{checkIfavailable("We0200")}</a></td>
                        <td><a href="/" id="Th0200" onClick={scheduleAlesson}>{checkIfavailable("Th0200")}</a></td>
                        <td><a href="/" id="Fr0200" onClick={scheduleAlesson}>{checkIfavailable("Fr0200")}</a></td>
                        <td><a href="/" id="Sa0200" onClick={scheduleAlesson}>{checkIfavailable("Sa0200")}</a></td>
                        <td><a href="/" id="Su0200" onClick={scheduleAlesson}>{checkIfavailable("Su0200")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0230" onClick={scheduleAlesson}>{checkIfavailable("Tu0230")}</a></td>
                        <td><a href="/" id="We0230" onClick={scheduleAlesson}>{checkIfavailable("We0230")}</a></td>
                        <td><a href="/" id="Th0230" onClick={scheduleAlesson}>{checkIfavailable("Th0230")}</a></td>
                        <td><a href="/" id="Fr0230" onClick={scheduleAlesson}>{checkIfavailable("Fr0230")}</a></td>
                        <td><a href="/" id="Sa0230" onClick={scheduleAlesson}>{checkIfavailable("Sa0230")}</a></td>
                        <td><a href="/" id="Su0230" onClick={scheduleAlesson}>{checkIfavailable("Su0230")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>3:00</span></td>
                        <td><a href="/" id="Tu0300" onClick={scheduleAlesson}>{checkIfavailable("Tu0300")}</a></td>
                        <td><a href="/" id="We0300" onClick={scheduleAlesson}>{checkIfavailable("We0300")}</a></td>
                        <td><a href="/" id="Th0300" onClick={scheduleAlesson}>{checkIfavailable("Th0300")}</a></td>
                        <td><a href="/" id="Fr0300" onClick={scheduleAlesson}>{checkIfavailable("Fr0300")}</a></td>
                        <td><a href="/" id="Sa0300" onClick={scheduleAlesson}>{checkIfavailable("Sa0300")}</a></td>
                        <td><a href="/" id="Su0300" onClick={scheduleAlesson}>{checkIfavailable("Su0300")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0330" onClick={scheduleAlesson}>{checkIfavailable("Tu0330")}</a></td>
                        <td><a href="/" id="We0330" onClick={scheduleAlesson}>{checkIfavailable("We0330")}</a></td>
                        <td><a href="/" id="Th0330" onClick={scheduleAlesson}>{checkIfavailable("Th0330")}</a></td>
                        <td><a href="/" id="Fr0330" onClick={scheduleAlesson}>{checkIfavailable("Fr0330")}</a></td>
                        <td><a href="/" id="Sa0330" onClick={scheduleAlesson}>{checkIfavailable("Sa0330")}</a></td>
                        <td><a href="/" id="Su0330" onClick={scheduleAlesson}>{checkIfavailable("Su0330")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>4:00</span></td>
                        <td><a href="/" id="Tu0400" onClick={scheduleAlesson}>{checkIfavailable("Tu0400")}</a></td>
                        <td><a href="/" id="We0400" onClick={scheduleAlesson}>{checkIfavailable("We0400")}</a></td>
                        <td><a href="/" id="Th0400" onClick={scheduleAlesson}>{checkIfavailable("Th0400")}</a></td>
                        <td><a href="/" id="Fr0400" onClick={scheduleAlesson}>{checkIfavailable("Fr0400")}</a></td>
                        <td><a href="/" id="Sa0400" onClick={scheduleAlesson}>{checkIfavailable("Sa0400")}</a></td>
                        <td><a href="/" id="Su0400" onClick={scheduleAlesson}>{checkIfavailable("Su0400")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0430" onClick={scheduleAlesson}>{checkIfavailable("Tu0430")}</a></td>
                        <td><a href="/" id="We0430" onClick={scheduleAlesson}>{checkIfavailable("We0430")}</a></td>
                        <td><a href="/" id="Th0430" onClick={scheduleAlesson}>{checkIfavailable("Th0430")}</a></td>
                        <td><a href="/" id="Fr0430" onClick={scheduleAlesson}>{checkIfavailable("Fr0430")}</a></td>
                        <td><a href="/" id="Sa0430" onClick={scheduleAlesson}>{checkIfavailable("Sa0430")}</a></td>
                        <td><a href="/" id="Su0430" onClick={scheduleAlesson}>{checkIfavailable("Su0430")}</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>5:00</span></td>
                        <td><a href="/" id="Tu0500" onClick={scheduleAlesson}>{checkIfavailable("Tu0500")}</a></td>
                        <td><a href="/" id="We0500" onClick={scheduleAlesson}>{checkIfavailable("We0500")}</a></td>
                        <td><a href="/" id="Th0500" onClick={scheduleAlesson}>{checkIfavailable("Th0500")}</a></td>
                        <td><a href="/" id="Fr0500" onClick={scheduleAlesson}>{checkIfavailable("Fr0500")}</a></td>
                        <td><a href="/" id="Sa0500" onClick={scheduleAlesson}>{checkIfavailable("Sa0500")}</a></td>
                        <td><a href="/" id="Su0500" onClick={scheduleAlesson}>{checkIfavailable("Su0500")}</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0530" onClick={scheduleAlesson}>{checkIfavailable("Tu0530")}</a></td>
                        <td><a href="/" id="We0530" onClick={scheduleAlesson}>{checkIfavailable("We0530")}</a></td>
                        <td><a href="/" id="Th0530" onClick={scheduleAlesson}>{checkIfavailable("Th0530")}</a></td>
                        <td><a href="/" id="Fr0530" onClick={scheduleAlesson}>{checkIfavailable("Fr0530")}</a></td>
                        <td><a href="/" id="Sa0530" onClick={scheduleAlesson}>{checkIfavailable("Sa0530")}</a></td>
                        <td><a href="/" id="Su0530" onClick={scheduleAlesson}>{checkIfavailable("Su0530")}</a></td>
                    </tr>
                </tbody>

            </table>


        </div>
    );

}