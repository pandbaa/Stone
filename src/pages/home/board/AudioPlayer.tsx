import { useRef, useState } from "react";
import { Button } from "../../../components/ui/button/Button";
import { Pause, Play } from "lucide-react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return null;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Button className="absolute right-4 bottom-14 z-10" variant="secondary" onClick={handlePlayPause}>
      <audio ref={audioRef} loop>
        <source src="../../../../img/music.mp3" type="audio/mp3"/>
        Ваш браузер не поддерживает аудио.
      </audio>
      {isPlaying ? <Pause /> : <Play />}
    </Button>
  );
}
