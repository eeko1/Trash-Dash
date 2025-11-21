import React from 'react';
import { usePlayMode } from 'contexts/PlayContext';
import DropGame from '../views/Dropgame';
import Trashorsmash from '../views/Trashorsmash';
import PlayModeFinish from './PlayModeFinish';

const PlayMode: React.FC = () => {
  const { currentGame } = usePlayMode();

  if (currentGame === 'dropgame') {
    return <DropGame />;
  } else if (currentGame === 'trashorsmash') {
    return <Trashorsmash />;
  } else if (currentGame === 'finished') {
    return <PlayModeFinish />;
  }

  return null;
};

export default PlayMode;