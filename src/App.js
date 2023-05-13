import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './component/Navbar'
import Home from './component/Home'
import About from './component/About'
import NoteState from './context/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import Addstudent from './component/Addstudent';
import Studentlist from './component/Studentlist';
import Studentdata from './component/Studentdata';
import Addmarksheet from './component/Addmarksheet';
import Marksheetlist from './component/Marksheetlist';
import Addcollege from './component/Addcollege';
import Collegelist from './component/Collegelist';
import Addrole from './component/Addrole';
import Rolelist from './component/Rolelist';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
  
   <NoteState>
    <Router>
        <Navbar />
       
        <Alert  alert={alert}/>
        <div className="container">
        <Switch>
          <Route exact path="/studentdata"><Studentdata /></Route>
          
          <Route exact path="/"><Home showAlert={showAlert} /></Route>
          <Route exact path="/about"><About /></Route>

          <Route exact path="/login"><Login showAlert={showAlert}/></Route>
          <Route exact path="/signup"><Signup showAlert={showAlert}/></Route>
          
          <Route exact path="/addstudent"><Addstudent showAlert={showAlert}/></Route>
          <Route exact path="/studentlist"><Studentlist showAlert={showAlert}/></Route>
         
          <Route exact path="/addmarksheet"><Addmarksheet showAlert={showAlert}/></Route>
          <Route exact path="/marksheetlist"><Marksheetlist showAlert={showAlert}/></Route>
         
          <Route exact path="/addcollege"><Addcollege showAlert={showAlert}/></Route>
          <Route exact path="/collegelist"><Collegelist showAlert={showAlert}/></Route>
          
          <Route exact path="/addrole"><Addrole showAlert={showAlert}/></Route>
          <Route exact path="/rolelist"><Rolelist showAlert={showAlert}/></Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
  
    </>
  )
}

export default App

