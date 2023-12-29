import { useEffect } from "react";


const AlertSound = () => {
  useEffect(() => {
    const audioElement = new Audio("https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3");
    audioElement.;

    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  return null;
};

export default AlertSound;
