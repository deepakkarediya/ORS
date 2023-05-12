import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/noteContext';
import { useHistory } from 'react-router-dom';
const Marksheetlist = (props) => {
   
  const notecontext = useContext(NoteContext);
  const history = useHistory();
  const { marksheet, fetchMarksheet, deleteMarksheet, updateMarksheet } = notecontext;
  const [addmarksheet, setMarksheet] = useState({id:"", Uname: "", Urollno: "", Uphysics: "", Uchemistry: "", Umaths: "" });
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetchMarksheet();
    }
    else {
      history.push("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateMarksheets = (currentMarksheet) => {
    ref.current.click();
    setMarksheet({ id: currentMarksheet._id, Uname: currentMarksheet.name, Urollno: currentMarksheet.rollno, Uphysics: currentMarksheet.physics ,Uchemistry: currentMarksheet.chemistry, Umaths: currentMarksheet.maths });

  }
  const onChange = (e) => {
    setMarksheet({ ...addmarksheet, [e.target.name]: e.target.value });

  }
  const handleClick = (e) => {
    e.preventDefault();
    updateMarksheet(addmarksheet.id, addmarksheet.Uname, addmarksheet.Urollno, addmarksheet.Uphysics, addmarksheet.Uchemistry, addmarksheet.Umaths);
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
                    <label htmlFor="Uname" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Uname" name='Uname' aria-describedby="emailHelp" value={addmarksheet.Uname} onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="Urollno" className="form-label">RollNo</label>
                    <input type="text" className="form-control" id="Urollno" name='Urollno' value={addmarksheet.Urollno} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Uphysics" className="form-label">Physics</label>
                    <input type="text" className="form-control" id="Uphysics" name='Uphysics' value={addmarksheet.Uphysics} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Uchemistry" className="form-label">Chemistry</label>
                    <input type="text" className="form-control" id="Uchemistry" name='Uchemistry' value={addmarksheet.Uchemistry} minLength={1} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Umaths" className="form-label">Maths</label>
                    <input type="text" className="form-control" id="Umaths" name='Umaths' value={addmarksheet.Umaths} minLength={1} onChange={onChange} required />
                </div>


            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  disabled={addmarksheet.Uname.length<2 ||addmarksheet.Urollno.length<2} type="submit" className="btn btn-primary">Update student</button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>      
          <table className="table table-success my-5">
          <thead className="table-dark">
            <tr >
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Rollno</th>
              <th scope="col">Physics</th>
              <th scope="col">Chemistry</th>
              <th scope="col">Maths</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>

            </tr>
          </thead>
          <tbody>
            {marksheet.map((data, i) => {

              return <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.name}</td>
                <td>{data.rollno}</td>
                <td>{data.physics}</td>
                <td>{data.chemistry}</td>
                <td>{data.maths}</td>
                <td><i className="fa-solid fa-trash mx-2" onClick={() => { deleteMarksheet(data._id) ;props.showAlert("deleted successfully", "success");}}></i></td>

                <td> <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateMarksheets(data); }}></i></td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Marksheetlist
