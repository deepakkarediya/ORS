import React ,{useContext,useEffect} from 'react'
import NoteContext from '../context/noteContext';

const Home = () => {
  const notecontext = useContext(NoteContext);
  const { fetchparticularstudent,particularstudent} = notecontext;
  useEffect(() => {
  
    fetchparticularstudent();
  },[]);
  return (
    <>  
    <div>
      {/* <img src={`http://localhost:8989/${particularstudent.files}`}  width={200} height={200} alt="demo" /> */}
    
    </div>  
   <div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src={`http://localhost:8989/${particularstudent.files}`} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Online Result System</h1>
        <p className="lead">Online Result System is a management information system for education sector establishments used to manage student data.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Let's Go</button>
          
        </div>
      </div>
    </div>
  </div>


</>
  )
}

export default Home
