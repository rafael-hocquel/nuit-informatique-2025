import { useEffect, useRef } from 'react';

export function useKonamiCode(onSuccess: () => void, isGameRunning: boolean = false) {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp", 
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ];
  
  const keySequence = useRef<string[]>([]);

  useEffect(() => {
    // Don't listen when game is running
    if (isGameRunning) {
      keySequence.current = []; // Reset sequence
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence.current.push(e.key);
      console.log("Current sequence:", keySequence.current);

      if (keySequence.current.length > konamiCode.length) {
        keySequence.current.shift();
      }

      const isMatch = keySequence.current.every(
        (key, index) => key === konamiCode[index]
      );

      if (isMatch && keySequence.current.length === konamiCode.length) {
        console.log("KONAMI CODE ACTIVATED!");
        onSuccess();
        keySequence.current = [];
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSuccess, isGameRunning, konamiCode]);
}



