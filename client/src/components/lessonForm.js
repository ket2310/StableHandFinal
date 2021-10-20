import React, { useState, useEffect } from "react";
import "../styles/lesson.css"
import findDateOfLesson from "../utils/findDateOfLesson";
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_HORSES, QUERY_RIDERS, QUERY_INSTRUCTORS } from "../utils/queries";
import { BOOK_LESSON, ADD_HORSE_TO_LESSON, ADD_RIDER_TO_LESSON
    , ADD_INSTRUCTOR_TO_LESSON  } from "../utils/mutations";

const moment = require('moment');
var idRider = null;
var idInstructor = null;
var idHorse = null;

function LessonForm(props) {
    const weekOfDate = props.weekOf.format("MM/DD/YYYY");
    const lessonDay = props.lessonDay;
    const bookedDate = findDateOfLesson(lessonDay, weekOfDate)
    const [lessonDate, setLessonDate] = useState(moment())
    const [startTime, setStartTime] = useState('9:00');
    const [endTime, setEndTime] = useState('10:00');
    const [duration, setDuration] = useState(1);
    const [rider, setRider] = useState('')
    const [instructor, setInsteructor] = useState('')
    const [horse, setHorse] = useState('')

    const { loading: loadingRiders, data: rdata } = useQuery(QUERY_RIDERS);
    const { loading: loadingInstructors, data: idata } = useQuery(QUERY_INSTRUCTORS)
    const { loading: loadintHorses, data: hdata } = useQuery(QUERY_HORSES)

    const riders = rdata?.riders || [];
    const instructors = idata?.instructors || [];
    const horses = hdata?.horses || [];

    const [bookLesson, { errorBook }] = useMutation(BOOK_LESSON);
    const [addRidertoLesson, { errRider }] = useMutation(ADD_RIDER_TO_LESSON);
    const [addInstructortoLesson, { errInstructor }] = useMutation(ADD_INSTRUCTOR_TO_LESSON);
    const [addHorsetoLesson, { errHorse }] = useMutation(ADD_HORSE_TO_LESSON);

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = e.target;
    };

    const handleRiderChange = (e) => {
        setRider(e.target.value)
        idRider = e.target.value;
        console.log(idRider)
    };

    const handleInstructorChange = (e) => {
        setInsteructor(e.target.value)
        idInstructor = e.target.value;
        console.log(idInstructor)
    };

    const handleHorseChange = (e) => {
        setHorse(e.target.value);
        idHorse = e.target.value;
        console.log(idHorse)
    };
 
    const handleFormSubmit = async () => {
        console.log(riders)
        console.log(instructors)
        console.log(horses)

        const objRider = riders.find(rider => rider._id === idRider);
        const objInstructor = instructors.find(instructor => instructor._id === idInstructor);
        const objHorse = horses.find(horse => horse._id === idHorse);

        console.log(objRider)
        console.log(objInstructor)
        console.log(objHorse)


        try {
            const {data} = await bookLesson({
                variables: {
                   lessonDate: lessonDate, 
                   startTime: startTime,
                   endTime: endTime,
                   duration: duration,
                   rider: { _id: objRider._id, firstName: objRider.firstNme, lastName: objRider.lastName},
                   instructor: { _id: objInstructor._id, firstName: objInstructor.firstName, lastName: objInstructor.lastName},
                   horse: {_id: objHorse._id, name: objHorse.name}

                },
            });
            // console.log(data)
            // if (data){
            //     console.log("SOMEBODY HELP MEEEEEEEEEEEEEEE!!!!!!!!!!!!!!!!!")
            //     const {riderData } = await addRidertoLesson({
            //         variables:{
            //             rider: {...objRider}
            //         }
            //     });
            //     const {instructorData } = await addInstructortoLesson({
            //         variables:{
            //             instructor: {...objInstructor}
            //         }
            //     });
            //     const { horseData } = await addHorsetoLesson({
            //         variables: {
            //             horse: {...objHorse}
            //         }
            //     })
            // }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        props.setTrigger(false)
    }, [])
    return (props.trigger) ? (
        <div className="popup">
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
                            name="startTime"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Lesson Date"
                        />
                        <label> Start:</label>&nbsp;
                        <input
                            value={startTime}
                            name="startTime"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Start Time"
                        />
                    </div>
                    <div>
                        <label> End:</label>&nbsp;
                        <input
                            value={endTime}
                            name="End Time"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
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
                                (<option value={horse._id} key={horse._id}>{horse.name}</option>))}                        </select>
                    </div>
                    <div> <label>Duration</label>&nbsp;
                        <input
                            value={parseInt(duration)}
                            name="duration"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Length"
                        />
                    </div>
                    <button type="button" id="bookTime"
                        onClick={() => handleFormSubmit()}>
                        Submit
                    </button>
                </form>

            </div>
        </div>
    ) : "";
}


export default LessonForm;
