import { useState } from "react";

export default function useVisualMode(initial, id) {
  const [modes, setModes] = useState([initial]);


  // if(id ===17) {
  //   console.log("INSIDE useVisualMode")
  // }
  const transition = (mode, replace = false) => {

    if (replace) {
      setModes(prev => [...prev.slice(0, prev.length - 1), mode]);

    } else {
      if (id === 17) {
        // console.log("INSIDE TRANSITION", mode)
      }
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

  
  // if(id === 17){
  //   console.log("MODE HERE id 17", modes, mode)
  // }
  
  return { mode, transition, back }
};

