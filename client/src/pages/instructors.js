import React, { useState } from "react";
import "../styles/lesson.css"
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_INSTRUCTORS } from "../utils/queries";
import LessonForm from "../components/lessonForm";

export default function Instructors() {


    const { data: idata } = useQuery(QUERY_INSTRUCTORS)
    const instructors = idata?.instructors || [];

    const handleUpdate = (event) => {
        event.preventDefault();

        console.log('Update: ' + event.target.id);
    }

    const handleDelete = (event) => {
        event.preventDefault();

        console.log('Delete: ' + event.target.id);
    }

    const handleAdd = (event) => {
        event.preventDefault();

        
    }

    return (
        <div>
            Riding Instructors
            <table>
                <thead>
                    <tr>
                        <th align="left">First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody >
                    {instructors.map((inst, index) => (
                        <tr data-index={index} key={inst._id}>
                            <td>{inst.firstName}</td>
                            <td>{inst.lastName}</td>
                            <td>
                                <button
                                    type="button"
                                    id={inst._id}
                                    onClick={(e) => handleUpdate(e)}>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    id={inst._id}
                                    onClick={(e) => handleDelete(e)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                    <td>
                                <button
                                    type="button"                                  
                                    onClick={(e) => handleAdd(e)}>
                                    Add Instructor
                                </button>
                            </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}