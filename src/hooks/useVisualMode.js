import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // when function is called change the mode to whichever mode was passed in, update the history only if the replace parameter is false
  const transition = (change, replace = false) => {
    setMode(change);

    if (!replace) {
      setHistory(history => [...history, change]);
    }
  }
  
  // remove most recent mode from history and update mode to previous state
  const back = () => {
    if (history.length > 1) {
      const previous = history.slice(0, -1);
      
      setHistory(previous);
      setMode(previous[previous.length - 1]);
    }
  }

  // to use in Appointment.index
  return {
    mode,
    transition,
    back
  };
}