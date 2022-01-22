import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (change, replace = false) => {
    setMode(change);
    //history.push(change) --> works too i think
    if (!replace) {
      setHistory(history => [...history, change]);
    }
  }
  
  const back = () => {
    if (history.length > 1) {
      //history.pop() --> works too i think
      const previous = history.slice(0, -1);
      setHistory(previous);
      setMode(previous[previous.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back
  };
}