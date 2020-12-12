import { useState } from "react";

export default function useVisualMode(initial) {
  const [modes, setModes] = useState([initial]);

  console.log("INSIDE useVisualMode")
  const transition = (mode, replace = false) => {

    console.log("INSIDE TRANSITION")
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

