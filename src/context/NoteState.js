import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8989";

  const StudentData = [];
  const initialStudentData = [];
  const initialmarksheetdata = [];
  const initialcollegedata = [];
  const initialroledata = [];
  const initialparticularstudent = [];

  const [studentdata, setStudentData] = useState(initialStudentData);
  const [marksheet, setMarksheet] = useState(initialmarksheetdata);
  const [college, setCollege] = useState(initialcollegedata);
  const [role, setRole] = useState(initialroledata);


  const [studentdatas, setStudentdatas] = useState(StudentData);
  const [particularstudent, setParticularStudent] = useState(initialparticularstudent);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //fetch student
  const fetchstudentDetails = async () => {

    const response = await fetch(`${host}/api/auth/findall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //console.log(json);
    setStudentdatas(json);
  }

  
  const fetchparticularstudent = async () => {
    const response = await fetch(`${host}/api/auth/getregis`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();
     console.log(json);
    setParticularStudent(json);
  }

  //Add Student
  const addStudent = async (firstname, lastname, email, mobileNo, collegeId) => {

    const response = await fetch(`${host}/api/student/addstudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ firstname, lastname, email, mobileNo, collegeId }),
    });

    const addstudent = await response.json();
    console.log(addstudent)
    if(addstudent.success){

      props.showAlert("Add student successfully", "success");
    }
    if(addstudent.error){
      props.showAlert(addstudent.error, "danger");
    }
    setStudentData(studentdata.concat(addstudent));
  };

  const handlePageChange = async (newPage) => {
   
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);    
    }  
  };

  //fetch student
  const fetchStudent = async (currentPage) => {   
 try{
    const response = await fetch(`${host}/api/student/fetchstudent/?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      }
   
    });
    const json = await response.json();
    console.log(json);
    setStudentData(json.student);
    setCurrentPage(json.page);
    setTotalPages(json.totalPages)


  } catch (error) {
    console.error('Error fetching student data:', error);
  }
}


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
  const updateStudent = async (id, firstname, lastname, email, mobileNo, collegeId) => {
    const response = await fetch(`${host}/api/student/updatestudent/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ firstname, lastname, email, mobileNo, collegeId }),
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



  //Add Marksheet
  const addMarksheet = async (name, rollno, physics, chemistry, maths) => {

    const response = await fetch(`${host}/api/marksheet/addmarksheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ name, rollno, physics, chemistry, maths }),
    });

    const addmarksheet = await response.json();
    console.log(addmarksheet)
    if(addmarksheet.success){

      props.showAlert("Add marksheet successfully", "success");
    }
    if(addmarksheet.error){
      props.showAlert(addmarksheet.error, "danger");
    }
    setMarksheet(marksheet.concat(addmarksheet));
  };

  //fetch marksheet
  const fetchMarksheet = async () => {

    const response = await fetch(`${host}/api/marksheet/fetchmarksheet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      }
    });
    const json = await response.json();
    console.log(json);
    setMarksheet(json);
  };

  //Delete marksheet
  const deleteMarksheet = async (id) => {
    const response = await fetch(`${host}/api/marksheet/deletemarksheet/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json)
    console.log("Deleting the marksheet with id" + id);
    const newMarksheet = marksheet.filter((data) => { return data._id !== id })
    setMarksheet(newMarksheet)
  };


  //Edit marksheet
  const updateMarksheet = async (id, name, rollno, physics, chemistry, maths) => {
    const response = await fetch(`${host}/api/marksheet/updatemarksheet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ name, rollno, physics, chemistry, maths }),
    });
    const json = await response.json();
    console.log(json)

    let newStudent = JSON.parse(JSON.stringify(marksheet))
    for (let index = 0; index < newStudent.length; index++) {
      const element = newStudent[index];
      if (element._id === id) {
        element.name = name;
        element.rollno = rollno;
        element.physics = physics;
        element.chemistry = maths;
        element.maths = maths;
        newStudent[index].name = name;
        newStudent[index].rollno = rollno;
        newStudent[index].physics = physics;
        newStudent[index].chemistry = chemistry;
        newStudent[index].maths = maths;
        break;
      }

    }
    setMarksheet(newStudent);
  }



  //Add College
  const addCollege = async (collegename, address, city, state, mobileno) => {

    const response = await fetch(`${host}/api/college/addcollege`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ collegename, address, city, state, mobileno }),
    });

    const addcollege = await response.json();
    console.log(addcollege)
    if(addcollege.success){

      props.showAlert("Add college successfully", "success");
    }
    if(addcollege.error){
      props.showAlert(addcollege.error, "danger");
    }
    setCollege(college.concat(addcollege));
  };

  //fetch College
  const fetchCollege = async () => {

    const response = await fetch(`${host}/api/college/fetchcollege`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      }
    });
    const json = await response.json();
    console.log(json);
    setCollege(json);
  };

  //Delete College
  const deleteCollege = async (id) => {
    const response = await fetch(`${host}/api/college/deletecollege/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json)
    // console.log("Deleting the college with id" + id);
    const newCollege = college.filter((data) => { return data._id !== id })
    setCollege(newCollege)
  };


  //Edit College
  const updateCollege = async (id, collegename, address, city, state, mobileno) => {
    const response = await fetch(`${host}/api/college/updatecollege/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ collegename, address, city, state, mobileno }),
    });
    const json = await response.json();
    console.log(json)

    let newStudent = JSON.parse(JSON.stringify(college))
    for (let index = 0; index < newStudent.length; index++) {
      const element = newStudent[index];
      if (element._id === id) {
        element.collegename = collegename;
        element.address = address;
        element.city = city;
        element.state = state;
        element.mobileno = mobileno;
        newStudent[index].collegename = collegename;
        newStudent[index].address = address;
        newStudent[index].city = city;
        newStudent[index].state = state;
        newStudent[index].mobileno = mobileno;
        break;
      }

    }
    setCollege(newStudent);
  }
  //Add Role
  const addRole = async (rolename, description) => {

    const response = await fetch(`${host}/api/role/addrole`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ rolename, description }),
    });

    const addrole = await response.json();
    console.log(addrole)
    if(addrole.success){

      props.showAlert("Add role successfully", "success");
    }
    if(addrole.error){
      props.showAlert(addrole.error, "danger");
    }
    setRole(role.concat(addrole));
  };

  //fetch College
  const fetchRole = async () => {

    const response = await fetch(`${host}/api/role/fetchrole`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      }
    });
    const json = await response.json();
    console.log(json);
    setRole(json);
  };

  //Delete College
  const deleteRole = async (id) => {
    const response = await fetch(`${host}/api/role/deleterole/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json)
    console.log("Deleting the Role with id" + id);
    const newRole = role.filter((data) => { return data._id !== id })
    setRole(newRole)
  };

  //Edit College
  const updateRole = async (id, rolename, description) => {
    const response = await fetch(`${host}/api/role/updaterole/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ rolename, description }),
    });
    const json = await response.json();
    console.log(json)

    let newStudent = JSON.parse(JSON.stringify(role))
    for (let index = 0; index < newStudent.length; index++) {
      const element = newStudent[index];
      if (element._id === id) {
        element.rolename = rolename;
        element.description = description;
        newStudent[index].rolename = rolename;
        newStudent[index].description = description;
        break;
      }

    }
    setRole(newStudent);
  }

  return (
    <NoteContext.Provider value={{
      fetchstudentDetails, studentdatas, addStudent, fetchStudent, studentdata,currentPage,totalPages, handlePageChange,deleteStudent, updateStudent,
      addMarksheet, marksheet, fetchMarksheet, deleteMarksheet, updateMarksheet
      , addCollege, college, fetchCollege, deleteCollege, updateCollege,
      addRole, role, fetchRole, updateRole, deleteRole,
      fetchparticularstudent,particularstudent
    }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
