import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import ActiveProjects from './ActiveProjects';
import Test from './Test';
import Login from './Login';
import Signup from "./Signup";
import ProjectSetup from "./ProjectSetup";
import Project from "./Project";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/logout" element={<Navigate replace to="/home" />} />
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/activeProjects" element={<ActiveProjects/>}/>
                <Route exact path="/test" element={<Test/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/projectSetup" element={<ProjectSetup/>}/>
                <Route path="/project/:projectId" element={<Project/>} />
                <Route path="/project/:projectId/file/:fileId" element={<Project/>} />
            </Routes>
        </Router>
    )
}

export default App;
