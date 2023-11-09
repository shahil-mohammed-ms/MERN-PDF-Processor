
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App"> 
    <Router>

<Routes>
<Route path="/home" element={<HomePage/>}/>
</Routes>

</Router>
    </div>
  );
}

export default App;
