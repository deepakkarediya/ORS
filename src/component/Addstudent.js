import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext';

const Addstudent = (props) => {
    const notecontext = useContext(NoteContext);
    const { addStudent } = notecontext;
    const [addstudent, setStudent] = useState({ firstname: "", lastname: "", email: "", mobileNo: "", collegeId: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addStudent(addstudent.firstname, addstudent.lastname, addstudent.email, addstudent.mobileNo, addstudent.collegeId);
        setStudent({ firstname: "", lastname: "", email: "", mobileNo: "", collegeId: "" });
        props.showAlert("Add note successfully", "success");
    }
    const onChange = (e) => {
        setStudent({ ...addstudent, [e.target.name]: e.target.value });

    }
    return (
        <div className="container my-3">
            <h1>Add a Student</h1>
            <form  onSubmit={handleClick} className='my-3'>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">Firstname</label>
                    <input type="text" className="form-control" id="firstname" name='firstname' aria-describedby="emailHelp" value={addstudent.firstname} onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Lastname</label>
                    <input type="text" className="form-control" id="lastname" name='lastname' value={addstudent.lastname} onChange={onChange} minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" name='email' value={addstudent.email} onChange={onChange} minLength={4} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">MobileNo</label>
                    <input type="text" className="form-control" id="mobileNo" name='mobileNo' value={addstudent.mobileNo} minLength={10} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="collegeId" className="form-label">CollegeId</label>
                    <input type="text" className="form-control" id="collegeId" name='collegeId' value={addstudent.collegeId} minLength={3} onChange={onChange} required />
                </div>

                <button type="submit" disabled={addstudent.firstname.length<5 ||addstudent.lastname.length<5} className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Addstudent
