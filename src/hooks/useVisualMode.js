import { useState } from "react";

export default function useVisualMode(initial) {
  const [modes, setModes] = useState([initial]);

  const transition = (mode, replace = false) => {
    const newModes = [...modes];

    if (replace) {
      newModes.pop()
    }

    newModes.push(mode);
    setModes(newModes);
  }

  const back = () => {
    if (modes.length < 2) {
      return;
    }

    const newModes = [...modes]
    
    newModes.pop()
    setModes(newModes)
  }

  const mode = modes[modes.length - 1]

  return { mode, transition, back }
};

