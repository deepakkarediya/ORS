import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/noteContext';
import { useHistory } from 'react-router-dom';
const Studentlist = (props) => {
  
  
  const notecontext = useContext(NoteContext);
  const history = useHistory();
  const { studentdata, fetchStudent, deleteStudent, updateStudent } = notecontext;
  const [addstudent, setStudent] = useState({ id: "", Ufirstname: "", Ulastname: "", Uemail: "", UmobileNo: "", UcollegeId: "" });
  useEffect(() => {
     if(sessionStorage.getItem('token')){

       fetchStudent();
     }
    
    else {
      history.push("/login")
    }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateStudents = (currentStudent) => {
    ref.current.click();
    setStudent({ id: currentStudent._id, Ufirstname: currentStudent.firstname, Ulastname: currentStudent.lastname, Uemail: currentStudent.email, UmobileNo: currentStudent.mobileNo, UcollegeId: currentStudent.collegeId });

  }
  const onChange = (e) => {
    setStudent({ ...addstudent, [e.target.name]: e.target.value });

  }
  const handleClick = (e) => {
    e.preventDefault();
    updateStudent(addstudent.id, addstudent.Ufirstname, addstudent.Ulastname, addstudent.Uemail, addstudent.UmobileNo, addstudent.UcollegeId);
    props.showAlert("Updated successfully", "success");
    refclose.current.click();

  }

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update student</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form onSubmit={handleClick} className='my-3'>
                <div className="mb-3">
                  <label htmlFor="Ufirstname" className="form-label">Firstname</label>
                  <input type="text" className="form-control" id="Ufirstname" name='Ufirstname' aria-describedby="emailHelp" value={addstudent.Ufirstname} onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="Ulastname" className="form-label">Lastname</label>
                  <input type="text" className="form-control" id="Ulastname" name='Ulastname' value={addstudent.Ulastname} onChange={onChange} minLength={2} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="Uemail" className="form-label">Email</label>
                  <input type="text" className="form-control" id="Uemail" name='Uemail' value={addstudent.Uemail} onChange={onChange} minLength={4} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="UmobileNo" className="form-label">MobileNo</label>
                  <input type="text" className="form-control" id="UmobileNo" name='UmobileNo' value={addstudent.UmobileNo} minLength={10} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="UcollegeId" className="form-label">CollegeId</label>
                  <input type="text" className="form-control" id="UcollegeId" name='UcollegeId' value={addstudent.UcollegeId} minLength={3} onChange={onChange} required />
                </div>


            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  disabled={addstudent.Ufirstname.length<5 ||addstudent.Ulastname.length<5} type="submit" className="btn btn-primary">Update student</button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>      
          <table className="table table-success my-5 table-bordered">
          <thead className="table-dark">
            <tr >
              <th scope="col">Id</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">email</th>
              <th scope="col">MobileNo</th>
              <th scope="col">CollegeId</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>

            </tr>
          </thead>
          <tbody>
            {studentdata.map((data, i) => {

              return <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.email}</td>
                <td>{data.mobileNo}</td>
                <td>{data.collegeId}</td>
                <td><i className="fa-solid fa-trash mx-2" onClick={() => { deleteStudent(data._id) ;props.showAlert("deleted successfully", "success");}}></i></td>

                <td> <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateStudents(data); }}></i></td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Studentlist;
