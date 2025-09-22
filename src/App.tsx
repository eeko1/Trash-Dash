import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './views/Home'
import PickTheGame from './views/PickTheGame'


function App() {
  return (
  <Router>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PickTheGame"  element={<PickTheGame/>} />
     </Routes>
  </Router>
  );
}

export default App;