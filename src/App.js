import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import Test from './Test';
import Login from './Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/test" element={<Test/>}/>
                <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default App;
