import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Test from './Test';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/test" element={<Test/>}/>
            </Routes>
        </Router>
    )
}

export default App;
