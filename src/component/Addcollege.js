import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NoteContext from '../context/noteContext'
const Addcollege = (props) => {
  const notecontext = useContext(NoteContext);
  const { addCollege } = notecontext;
  const [addcollege, setCollege] = useState({ collegename: "", address: "",city: "",state: "", mobileno: "" });
  const history = useHistory();
  
  const handleClick = (e) => {
    e.preventDefault();
    addCollege(addcollege.collegename, addcollege.address,addcollege.city,addcollege.state, addcollege.mobileno);
    setCollege({  collegename: "", address: "", city: "", state: "", mobileno: "" });
    props.showAlert("Add College successfully", "success");
}
  const onChange = (e) => {
    setCollege({ ...addcollege, [e.target.name]: e.target.value });

}
  return (
    <div>
       {sessionStorage.getItem("token")?<div className="container my-3">
            <h1>Add College</h1>
            <form  onSubmit={handleClick} className='my-3'>
                <div className="mb-3">
                    <label htmlFor="collegename" className="form-label">Collegename</label>
                    <input type="text" className="form-control" id="collegename" name='collegename' aria-describedby="emailHelp" value={addcollege.collegename} onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name='address' value={addcollege.address} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" name='state' value={addcollege.state} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name='city' value={addcollege.city} minLength={1} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobileno" className="form-label">Mobileno</label>
                    <input type="text" className="form-control" id="mobileno" name='mobileno' value={addcollege.mobileno} minLength={1} onChange={onChange} required />
                </div>

                <button type="submit" disabled={addcollege.collegename.length<2 ||addcollege.address.length<1} className="btn btn-primary" >Submit</button>
            </form>
        </div>:history.push("/login")}
    </div>
  )
}

export default Addcollege
