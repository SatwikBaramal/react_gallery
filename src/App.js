import Navbar from "./Navbar";
import Home from "./Home";
import UserDetails from "./UserDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path ='/' element={<Home/>}/>
            <Route path='/userdetails/:id' element={<UserDetails/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
