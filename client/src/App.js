
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';

function App() {
  return (
    <div className="App"> 
    <Router>
    <Routes>
<Route path="/" element={<SigninPage/>}/>
</Routes>
<Routes>
<Route path="/login" element={<LoginPage/>}/>
</Routes>
<Routes>
<Route path="/home" element={<HomePage/>}/>
</Routes>

</Router>
    </div>
  );
}

export default App;
