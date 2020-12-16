import { useState } from "react";

export default function useVisualMode(initial, id) {
  const [modes, setModes] = useState([initial]);

  const transition = (mode, replace = false) => {

    if (replace) {
      setModes(prev => [...prev.slice(0, prev.length - 1), mode]);

    } else {
      setModes(prev => [...prev, mode]);
    }    
  }

  const back = () => {
    if (modes.length < 2) {
      return;
    }

    setModes(prev => [...prev.slice(0, prev.length - 1)]);
  }

  const mode = modes[modes.length - 1]
  
  return { mode, transition, back }
};

