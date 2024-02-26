import React, { useState } from "react";
import "../styles/lesson.css";
import findDateOfLesson from "../utils/findDateOfLesson";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import {
  QUERY_HORSES,
  QUERY_RIDERS,
  QUERY_INSTRUCTORS,
  QUERY_LESSONS,
} from "../utils/queries";
import { BOOK_LESSON } from "../utils/mutations";
import convertHour from "../utils/convertHour";

function LessonForm(props) {
  const [formData, setFormData] = useState({
    lessonDate: "",
    startTime: "",
    duration: 1,
    timeSlot: "",
    rider: {},
    instructor: {},
    horse: {},
  });

  const { lessonDay, timeSlot, weekOf, lessonHour: startTime } = props;

  const weekOfDate = weekOf.format("MM/DD/YYYY");
  const bookedDate = findDateOfLesson(lessonDay, weekOfDate).toString();
  const timeSlotUpdate = timeSlot + bookedDate.replace(/\//g, "");

  let duration = 1;

  // Query the riders, instructors and horses then set them to a variable if data is there
  const { data: rdata } = useQuery(QUERY_RIDERS);
  const { data: idata } = useQuery(QUERY_INSTRUCTORS);
  const { data: hdata } = useQuery(QUERY_HORSES);

  const riders = rdata?.riders || [];
  const instructors = idata?.instructors || [];
  const horses = hdata?.horses || [];

  const [bookLesson] = useMutation(BOOK_LESSON, {
    update(cache, { data: { bookLesson } }) {
      try {
        const { lessons } = cache.readQuery({ query: QUERY_LESSONS });

        cache.writeQuery({
          query: QUERY_LESSONS,
          data: { lessons: [bookLesson, ...lessons] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleInputChange = (e) => {
    //grab the name and value from item changed
    const { name, value } = e.target;
    // if the item is rider, instructor or horse
    //      adjust the input to add _id:value
    // else
    //      adjust the input to add value
    if (name === "rider" || name === "instructor" || name === "horse") {
      setFormData({ ...formData, [name]: { _id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async () => {
    //try to book a lesson with formdata state and other variables
    try {
      const { loading } = await bookLesson({
        variables: {
          ...formData,
          lessonDate: bookedDate,
          startTime,
          duration,
          timeSlot: timeSlotUpdate,
        },
      });
      // If it's not loading close modal and then set formData back to empty
      if (!loading) {
        props.setTrigger(false);
        setFormData({
          lessonDate: "",
          startTime: "",
          duration: 1,
          timeSlot: "",
          rider: {},
          instructor: {},
          horse: {},
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return props.trigger ? (
    props.riderLesson ? (
      <div className="popup">
        <div className="popup-content">
          <h3>{props.riderLesson.rider.firstName}</h3>
          <span className="close-btn" onClick={() => props.setTrigger(false)}>
            Close
          </span>
          {props.children}
          <form className="lessonForm" onSubmit={handleFormSubmit}>
            <div>
              <label> Date:</label>&nbsp;
              <input
                text={bookedDate}
                value={bookedDate}
                name="lessonDate"
                onChange={handleInputChange}
                type="text"
                placeholder="Lesson Date"
              />
            </div>
            <div>
              <label> Time:</label>&nbsp;
              <input
                value={convertHour(startTime) || {}}
                name="startTime"
                onChange={handleInputChange}
                type="text"
                placeholder="Start Time"
              />
            </div>
            <div>
              <label>Rider: </label>&nbsp;
              <select name="rider" onChange={handleInputChange}>
                <option defaultValue>
                  {props.riderLesson.rider.firstName +
                    " " +
                    props.riderLesson.rider.lastName}
                </option>
                {riders &&
                  riders.map((rider) => (
                    <option value={rider._id} key={rider._id}>
                      {rider.firstName + " " + rider.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Instructor: </label>&nbsp;
              <select name="instructor" onChange={handleInputChange}>
                <option defaultValue>
                  {props.riderLesson.instructor.firstName +
                    " " +
                    props.riderLesson.instructor.lastName}
                </option>
                {instructors &&
                  instructors.map((instructor) => (
                    <option value={instructor._id} key={instructor._id}>
                      {instructor.firstName + " " + instructor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Horse: </label>&nbsp;
              <select name="horse" onChange={handleInputChange}>
                <option defaultValue>{props.riderLesson.horse.name}</option>
                {horses &&
                  horses.map((horse) => (
                    <option value={horse._id} key={horse._id}>
                      {horse.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Duration</label>&nbsp;
              <select name="duration" onChange={handleInputChange}>
                <option value="1">1 hour</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
            {props.riderLesson ? (
              ""
            ) : (
              <button
                type="button"
                id="bookTime"
                onClick={(e) => handleFormSubmit(e)}
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    ) : (
      <div className="popup">
        <div className="popup-content">
          <h3>{props.message}</h3>
          <span className="close-btn" onClick={() => props.setTrigger(false)}>
            Close
          </span>
          {props.children}
          <form className="lessonForm">
            <div>
              <label> Date:</label>&nbsp;
              <input
                value={bookedDate}
                name="lessonDate"
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
            <div>
              <label>Rider: </label>&nbsp;
              <select name="rider" onChange={handleInputChange}>
                <option value="Rider">-- Select a Rider --</option>
                {riders &&
                  riders.map((rider) => (
                    <option value={rider._id} key={rider._id} name="rider">
                      {rider.firstName + " " + rider.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Instructor: </label>&nbsp;
              <select name="instructor" onChange={handleInputChange}>
                <option value="Instructor">-- Select an Instructor --</option>
                {instructors &&
                  instructors.map((instructor) => (
                    <option value={instructor._id} key={instructor._id}>
                      {instructor.firstName + " " + instructor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Horse: </label>&nbsp;
              <select name="horse" onChange={handleInputChange}>
                <option value="Horse">-- Select a Horse --</option>
                {horses &&
                  horses.map((horse) => (
                    <option value={horse._id} key={horse._id}>
                      {horse.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Duration</label>&nbsp;
              <select name="duration" onChange={handleInputChange}>
                <option value="1">1 hour</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
            <button
              type="button"
              id="bookTime"
              onClick={(e) => handleFormSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  ) : (
    ""
  );
}

export default LessonForm;
