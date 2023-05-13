import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NoteContext from '../context/noteContext'
const Addrole = (props) => {
  const notecontext = useContext(NoteContext);
  const { addRole} = notecontext;
  const [addrole, setRole] = useState({ rolename: "",description:"" });
  const history = useHistory();
  
  const handleClick = (e) => {
    e.preventDefault();
    addRole(addrole.rolename, addrole.description);
    setRole({ rolename: "",description:""  });
    props.showAlert("Add Role successfully", "success");
}
  const onChange = (e) => {
    setRole({ ...addrole, [e.target.name]: e.target.value });

}
  return (
    <div>
     {sessionStorage.getItem("token")?<div className="container my-3">
            <h1>Add Role</h1>
            <form  onSubmit={handleClick} className='my-3'>
                <div className="mb-3">
                    <label htmlFor="rolename" className="form-label">Rolename</label>
                    <input type="text" className="form-control" id="rolename" name='rolename' aria-describedby="emailHelp" value={addrole.rolename} onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={addrole.description} onChange={onChange} minLength={1} required />
                </div>
                

                <button type="submit" disabled={addrole.rolename.length<1 ||addrole.description.length<1} className="btn btn-primary" >Submit</button>
            </form>
        </div>:history.push("/login")}
    </div>
   
  )
}

export default Addrole
