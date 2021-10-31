import React from "react";
import '../styles/timesheet.css'
import LessonForm from "../components/lessonForm";
import { useState } from 'react';
import convertDay from "../utils/convertDay";
import convertHour from "../utils/convertHour";

const moment = require('moment');

export default function WklySchedule() {
    const [weekOf, setWeekOf] = useState( moment().startOf('week').day('Tuesday'));
    const [weekMsg, setWeeOfMessage] = useState("Lesson Schedule for the week of " + weekOf.format("dddd, MMMM Do"))
    const [timeSlot, setTimeSlot] = useState('');
    const [lessonDay, setDay] = useState('Tu');
    const [lessonHour, setHour] = useState('9:00')

    const [anchorPopup, setShow] = useState(false)
    const [message, setMessage] = useState('')
 
    const scheduleAlesson = (event) => {
        //alert('you are here!!!!!!!!!!!!!!')
        event.preventDefault();
        var tmp = event.target.id;  // "Tu0900"
        var day = tmp.substr(0,2);
        var hour = tmp.substr(2);

        setTimeSlot(tmp);
        setDay(day);
        setHour(hour)
        setMessage(convertDay(day) + " " + convertHour(hour));
        setShow(true);
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
                <tbody>
                    <tr>
                        <td rowSpan={2}><span>09:00</span></td>
                        <td><a href="/" id="Tu0900" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0900" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0900" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0900" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0900" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0900" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0930" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0930" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0930" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0930" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0930" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0930" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>10:00</span></td>
                        <td><a href="/" id="Tu1000" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We1000" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th1000" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr1000" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa1000" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su1000" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu1030" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We1030" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th1030" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr1030" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa1030" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su1030" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>11:00</span></td>
                        <td><a href="/" id="Tu1100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We1100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th1100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr1100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa1100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su1100" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu1130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We1130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th1130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr1130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa1130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su1130" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>12:00</span></td>
                        <td><a href="/" id="Tu1200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We1200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th1200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr1200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa1200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su1200" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu1230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We1230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th1230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr1230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa1230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su1230" onClick={scheduleAlesson}>Available</a></td>
                    </tr>

                    <tr>
                        <td rowSpan={2}><span>1:00</span></td>
                        <td><a href="/" id="Tu0100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0100" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0100" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0130" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0130" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>2:00</span></td>
                        <td><a href="/" id="Tu0200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0200" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0200" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0230" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0230" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>3:00</span></td>
                        <td><a href="/" id="Tu0300" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0300" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0300" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0300" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0300" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0300" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0330" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0330" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0330" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0330" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0330" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0330" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>4:00</span></td>
                        <td><a href="/" id="Tu0400" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0400" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0400" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0400" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0400" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0400" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0430" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0430" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0430" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0430" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0430" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0430" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}><span>5:00</span></td>
                        <td><a href="/" id="Tu0500" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0500" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0500" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0500" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0500" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0500" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                    <tr>
                        <td><a href="/" id="Tu0530" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="We0530" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Th0530" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Fr0530" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Sa0530" onClick={scheduleAlesson}>Available</a></td>
                        <td><a href="/" id="Su0530" onClick={scheduleAlesson}>Available</a></td>
                    </tr>
                </tbody>

            </table>


        </div>


    );
}