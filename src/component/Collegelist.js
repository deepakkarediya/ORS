import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/noteContext';
import { useHistory } from 'react-router-dom';

const Collegelist = (props) => {
  const notecontext = useContext(NoteContext);
  const history = useHistory();
  const { college, fetchCollege, deleteCollege, updateCollege } = notecontext;
  const [addcollege, setCollege] = useState({ id:"",Ucollegename: "", Uaddress: "",Ucity: "",Ustate: "", Umobileno: "" });
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetchCollege();
    }
    else {
      history.push("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateColleges = (currentCollege) => {
    ref.current.click();
    setCollege({ id: currentCollege._id, Ucollegename: currentCollege.collegename, Uaddress: currentCollege.address, Ucity: currentCollege.city ,Ustate: currentCollege.state, Umobileno: currentCollege.mobileno });

  }
  const onChange = (e) => {
    setCollege({ ...addcollege, [e.target.name]: e.target.value });

  }
  const handleClick = (e) => {
    e.preventDefault();
    updateCollege(addcollege.id, addcollege.Ucollegename, addcollege.Uaddress, addcollege.Ucity, addcollege.Ustate, addcollege.Umobileno);
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
                    <label htmlFor="Ucollegename" className="form-label">Collegename</label>
                    <input type="text" className="form-control" id="Ucollegename" name='Ucollegename' aria-describedby="emailHelp" value={addcollege.Ucollegename} onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="Uaddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="Uaddress" name='Uaddress' value={addcollege.Uaddress} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Ustate" className="form-label">State</label>
                    <input type="text" className="form-control" id="Ustate" name='Ustate' value={addcollege.Ustate} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Ucity" className="form-label">City</label>
                    <input type="text" className="form-control" id="Ucity" name='Ucity' value={addcollege.Ucity} minLength={1} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Umobileno" className="form-label">Mobileno</label>
                    <input type="text" className="form-control" id="Umobileno" name='Umobileno' value={addcollege.Umobileno} minLength={1} onChange={onChange} required />
                </div>


            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  disabled={addcollege.Ucollegename.length<2 ||addcollege.Uaddress.length<2} type="submit" className="btn btn-primary">Update student</button>
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
              <th scope="col">CollegeName</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">state</th>
              <th scope="col">mobileno</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>

            </tr>
          </thead>
          <tbody>
            {college.map((data, i) => {

              return <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.collegename}</td>
                <td>{data.address}</td>
                <td>{data.city}</td>
                <td>{data.state}</td>
                <td>{data.mobileno}</td>
                <td><i className="fa-solid fa-trash mx-2" onClick={() => { deleteCollege(data._id) ;props.showAlert("deleted successfully", "success");}}></i></td>

                <td> <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateColleges(data); }}></i></td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Collegelist
