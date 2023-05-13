import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NoteContext from '../context/noteContext';

const Addmarksheet = (props) => {
  const notecontext = useContext(NoteContext);
  const { addMarksheet } = notecontext;
  const [addmarksheet, setMarksheet] = useState({ name: "", rollno: "", physics: "", chemistry: "", maths: "" });
  const history = useHistory();
  
  
  const handleClick = (e) => {
    e.preventDefault();
    addMarksheet(addmarksheet.name, addmarksheet.rollno, addmarksheet.physics, addmarksheet.chemistry, addmarksheet.maths);
    setMarksheet({  name: "", rollno: "", physics: "", chemistry: "", maths: "" });
    props.showAlert("Add Marksheet successfully", "success");
}
  const onChange = (e) => {
    setMarksheet({ ...addmarksheet, [e.target.name]: e.target.value });

}
  return (
    <div>
       {sessionStorage.getItem("token")?<div className="container my-3">
            <h1>Add Marksheet</h1>
            <form  onSubmit={handleClick} className='my-3'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={addmarksheet.name} onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="rollno" className="form-label">RollNo</label>
                    <input type="text" className="form-control" id="rollno" name='rollno' value={addmarksheet.rollno} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="physics" className="form-label">Physics</label>
                    <input type="text" className="form-control" id="physics" name='physics' value={addmarksheet.physics} onChange={onChange} minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="chemistry" className="form-label">Chemistry</label>
                    <input type="text" className="form-control" id="chemistry" name='chemistry' value={addmarksheet.chemistry} minLength={1} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="maths" className="form-label">Maths</label>
                    <input type="text" className="form-control" id="maths" name='maths' value={addmarksheet.maths} minLength={1} onChange={onChange} required />
                </div>

                <button type="submit" disabled={addmarksheet.name.length<2 ||addmarksheet.rollno.length<1} className="btn btn-primary" >Submit</button>
            </form>
        </div>:history.push("/login")}
    </div>
  )
}

export default Addmarksheet
