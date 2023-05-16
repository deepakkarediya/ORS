import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home'
import NoteState from '../context/NoteState';
import Alert from './Alert';
import Navbar2 from './Navbar2'
import About from './About'
import Addstudent from './Addstudent';
import Studentlist from './Studentlist';
import Studentdata from './Studentdata';
import Addmarksheet from './Addmarksheet';
import Marksheetlist from './Marksheetlist';
import Addcollege from './Addcollege';
import Collegelist from './Collegelist';
import Addrole from './Addrole';
import Rolelist from './Rolelist';
const Dashboard = () => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
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
            <NoteState showAlert={showAlert}>
                <Router>
                    <Navbar2 />
                    {/* <Home/> */}
                    <Alert alert={alert} />
                    <div className="container">
                        <Switch>
                             <Route exact path="/"><Home showAlert={showAlert} /></Route>
                            {/* <Route exact path="/login"><Login showAlert={showAlert} /></Route>
                            <Route exact path="/signup"><Signup showAlert={showAlert} /></Route> */}

                            <Route exact path="/about"><About /></Route>
                            <Route exact path="/studentdata"><Studentdata /></Route>


                            <Route exact path="/addstudent"><Addstudent showAlert={showAlert} /></Route>
                            <Route exact path="/studentlist"><Studentlist showAlert={showAlert} /></Route>

                            <Route exact path="/addmarksheet"><Addmarksheet showAlert={showAlert} /></Route>
                            <Route exact path="/marksheetlist"><Marksheetlist showAlert={showAlert} /></Route>

                            <Route exact path="/addcollege"><Addcollege showAlert={showAlert} /></Route>
                            <Route exact path="/collegelist"><Collegelist showAlert={showAlert} /></Route>

                            <Route exact path="/addrole"><Addrole showAlert={showAlert} /></Route>
                            <Route exact path="/rolelist"><Rolelist showAlert={showAlert} /></Route> */}
                        </Switch>
                    </div>
                </Router>
            </NoteState>
        </>
    )
}

export default Dashboard
