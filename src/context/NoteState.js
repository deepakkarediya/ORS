import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8989";

  const initialStudentData = [];
  const [studentdata, setStudentData] = useState(initialStudentData);
   
  //Add Student
  const addStudent = async (firstname,lastname,email,mobileNo,collegeId) => {

    const response = await fetch(`${host}/api/student/addstudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":sessionStorage.getItem("token"),
      },
      body: JSON.stringify({firstname,lastname,email,mobileNo,collegeId }),
    });
  
    const addstudent = await response.json();
    console.log(addstudent)
    setStudentData(studentdata.concat(addstudent));
  };

  //fetch student
  const fetchStudent = async () => {

    const response = await fetch(`${host}/api/student/fetchstudent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":sessionStorage.getItem("token"),
      }
    });
    const json = await response.json();
    console.log(json);
    setStudentData(json);
  };
 
  //Delete note
 const deleteStudent = async (id) => {
  const response = await fetch(`${host}/api/student/deletestudent/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": sessionStorage.getItem("token"),
    },
  });
  const json = await response.json();
  console.log(json)
  console.log("Deleting the note with id" + id);
  const newStudent = studentdata.filter((data) => { return data._id !== id })
  setStudentData(newStudent)
};


//Edit note
const updateStudent = async (id,firstname,lastname,email,mobileNo,collegeId) => {
  const response = await fetch(`${host}/api/student/updatestudent/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": sessionStorage.getItem("token"),
    },
    body: JSON.stringify({ firstname,lastname,email,mobileNo,collegeId }),
  });
  const json = await response.json();
  console.log(json)

  let newStudent = JSON.parse(JSON.stringify(studentdata))
  for (let index = 0; index < newStudent.length; index++) {
    const element = newStudent[index];
    if (element._id === id) {
      element.firstname = firstname;
      element.lastname = lastname;
      element.email = email;
      element.mobileNo = mobileNo;
      element.collegeId = collegeId;
      newStudent[index].firstname = firstname;
      newStudent[index].lastname = lastname;
      newStudent[index].email = email;
      newStudent[index].mobileNo = mobileNo;
      newStudent[index].collegeId = collegeId;
      break;
    }

  }
  setStudentData(newStudent);
}
  return (
    <NoteContext.Provider value={{addStudent,fetchStudent,studentdata,deleteStudent,updateStudent}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
