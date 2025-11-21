import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './views/Home'
import PickTheGame from './views/PickTheGame'
import RecycleGuide from './views/RecycleGuide';
import Leaderboard from './views/Leaderboard';
import DropGame from './views/Dropgame';
import TrashOrSmash from './views/Trashorsmash'
import Recydle from './views/Recydle';
import { UserProvider } from './contexts/UserContext';
import { PointSender } from './contexts/PointContext';
import { PlayModeProvider } from './contexts/PlayContext';
import PlayMode from 'components/PlayMode';



function App() {
   return (
      <UserProvider>
         <PointSender>
            <PlayModeProvider>
               <Router>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/PickTheGame' element={<PickTheGame />} />
                     <Route path='/PlayMode' element={<PlayMode />} />
                     <Route path='/RecyclingGuide' element={<RecycleGuide />} />
                     <Route path='/Leaderboard' element={<Leaderboard />} />
                     <Route path='/DropGame' element={<DropGame />} />
                     <Route path='/TrashOrSmash' element={<TrashOrSmash />} />
                     <Route path='/Recydle' element={<Recydle />} />
                  </Routes>
               </Router>
            </PlayModeProvider>
            </PointSender>
      </UserProvider>
   );
}

export default App;