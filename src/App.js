import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import ActiveProjects from './ActiveProjects';
import Test from './Test';
import Login from './Login';
import Signup from "./Signup";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/activeProjects" element={<ActiveProjects/>}/>
                <Route exact path="/test" element={<Test/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
            </Routes>
        </Router>
    )
}

export default App;
