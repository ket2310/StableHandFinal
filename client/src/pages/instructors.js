import React, { useState } from "react";
import "../styles/lesson.css"
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_INSTRUCTORS } from "../utils/queries";
import LessonForm from "../components/lessonForm";

export default function Instructors() {

  
    const { data: idata } = useQuery(QUERY_INSTRUCTORS)  
    const instructors = idata?.instructors || [];
    console.log(instructors)


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
                {instructors.forEach(element => console.log(element))}

                    <tr>
                        <td></td>
                        <td>Doe</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}