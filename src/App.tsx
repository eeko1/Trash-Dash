import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './views/Home'
import PickTheGame from './views/PickTheGame'
import RecycleGuide from './views/RecycleGuide';
import Leaderboard from './views/Leaderboard';
import { UserProvider } from './contexts/UserContext';


function App() {
   return (
      <UserProvider>
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/PickTheGame" element={<PickTheGame />} />
               <Route path="/RecyclingGuide" element={<RecycleGuide />} />
               <Route path="/Leaderboard" element={<Leaderboard />} />
            </Routes>
         </Router>
      </UserProvider>
   );
}

export default App;