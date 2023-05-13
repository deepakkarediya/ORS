import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/noteContext';
import { useHistory } from 'react-router-dom';
const Rolelist = (props) => {
  const notecontext = useContext(NoteContext);
  const history = useHistory();
  const { role, fetchRole, deleteRole, updateRole } = notecontext;
  const [addrole, setRole] = useState({id:"", Urolename: "",Udescription:"" });
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetchRole();
    }
    else {
      history.push("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateRoles = (currentRole) => {
    ref.current.click();
    setRole({ id: currentRole._id, Urolename: currentRole.rolename, Udescription: currentRole.description,});

  }
  const onChange = (e) => {
    setRole({ ...addrole, [e.target.name]: e.target.value });

  }
  const handleClick = (e) => {
    e.preventDefault();
    updateRole(addrole.id, addrole.Urolename, addrole.Udescription);
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
                  <label htmlFor="Urolename" className="form-label">Collegename</label>
                  <input type="text" className="form-control" id="Urolename" name='Urolename' aria-describedby="emailHelp" value={addrole.Urolename} onChange={onChange} minLength={1} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="Udescription" className="form-label">Address</label>
                  <input type="text" className="form-control" id="Udescription" name='Udescription' value={addrole.Udescription} onChange={onChange} minLength={1} required />
                </div>
                

                <div className="modal-footer">
                  <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button disabled={addrole.Urolename.length < 1 || addrole.Udescription.length < 1} type="submit" className="btn btn-primary">Update student</button>
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
              <th scope="col">Rolename</th>
              <th scope="col">description</th>              
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {role.map((data, i) => {

              return <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.rolename}</td>
                <td>{data.description}</td>
              
                <td><i className="fa-solid fa-trash mx-2" onClick={() => { deleteRole(data._id); props.showAlert("deleted successfully", "success"); }}></i></td>

                <td> <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateRoles(data); }}></i></td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Rolelist
