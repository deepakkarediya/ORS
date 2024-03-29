import React, { useEffect, useContext } from 'react'
import NoteContext from '../context/noteContext';
import { useHistory } from 'react-router-dom';
const Studentdata = () => {
    const notecontext = useContext(NoteContext);
    const history = useHistory();
    const { fetchstudentDetails,studentdatas} = notecontext;
    // console.log(studentdatas[0].files);
    useEffect(() => {
       
        if (sessionStorage.getItem("token")) {
            fetchstudentDetails();
          }
          else {
            history.push("/login")
          }
    }, []);
    return (
        <div>
            <h1>User Data</h1>
            <table className="table table-success my-5 table-bordered ">
                <thead className="table-dark ">
                    <tr >
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">email</th>


                    </tr>
                </thead>
                <tbody>
                    {studentdatas.map((data, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td><img src={`http://localhost:8989/backend/${data.files}`} className="d-block mx-lg-auto img-fluid rounded-circle" alt="Bootstrap Themes" width="40" height="40" loading="lazy"/></td>
                            <td>{data.fname}</td>
                            <td>{data.lname}</td>
                            <td>{data.email}</td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Studentdata
