"use client"
import { useCallback, useEffect } from 'react'
import { useState, useRef  } from 'react';
import Image from 'next/image';
import { useKonamiCode } from '@/src/components/Snake/KonamiCode';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const HIGH_SCORE_KEY = "high-score";

enum GameState {
  START,
  PAUSE,
  RUNNING,
  GAME_OVER,
}

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface Position {
  x: number;
  y: number;
}

const SEGMENT_SIZE = 16;
const SPEED = 100;

const randomPosition = (): Position => ({
  x: Math.floor(Math.random() * (window.innerWidth - SEGMENT_SIZE)),
  y: Math.floor(Math.random() * (window.innerHeight - SEGMENT_SIZE)),
});

const initialSnake: Position[] = [{ x: 0, y: 0 }];

export default function Snake() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);

  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const snakeHeadRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<Direction>(Direction.RIGHT);

  const startGame = () => {
    setSnake([{ x: window.innerWidth / 2, y: window.innerHeight / 2 }]);
    setFood(randomPosition());
    setScore(0);
    setDirection(Direction.RIGHT);
    setGameState(GameState.RUNNING);
    setShowPopup(false);
  };

  useKonamiCode(() => {
    startGame();
  }, gameState === GameState.RUNNING);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const stored = localStorage.getItem(HIGH_SCORE_KEY);
    setHighScore(stored ? Number(stored) : 0);
  }, []);

  useEffect(() => {
    if (score > Number(localStorage.getItem(HIGH_SCORE_KEY))) {
      localStorage.setItem(HIGH_SCORE_KEY, String(score))
    }
  }, [score, highScore]);

  // Show popup when game ends, hide after 3 seconds
  useEffect(() => {
    if (gameState === GameState.GAME_OVER) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        setGameState(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const checkButtonCollision = useCallback(() => {
    if (!snakeHeadRef.current) return false;
    const snakeRect = snakeHeadRef.current.getBoundingClientRect();
    const elements = document.querySelectorAll(".kill-zone");

    for (const el of elements) {
      const btnRect = el.getBoundingClientRect();
      if (
        snakeRect.left < btnRect.right &&
        snakeRect.right > btnRect.left &&
        snakeRect.top < btnRect.bottom &&
        snakeRect.bottom > btnRect.top
      ) {
        return true;
      }
    }
    return false;
  }, []);

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      if (prevSnake.length === 0) return prevSnake;

      const head = prevSnake[0];
      let newHead: Position;

      switch (directionRef.current) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - SEGMENT_SIZE };
          break;
        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + SEGMENT_SIZE };
          break;
        case Direction.LEFT:
          newHead = { x: head.x - SEGMENT_SIZE, y: head.y };
          break;
        case Direction.RIGHT:
          newHead = { x: head.x + SEGMENT_SIZE, y: head.y };
          break;
      }

      const newSnake = [newHead, ...prevSnake];

      const distance = Math.hypot(newHead.x - food.x, newHead.y - food.y);
      if (distance < SEGMENT_SIZE) {
        setFood(randomPosition());
        setScore((prev) => prev + 1);
      } else {
        newSnake.pop();
      }

      if (
        newHead.x < 0 ||
        newHead.x > window.innerWidth - SEGMENT_SIZE ||
        newHead.y < 0 ||
        newHead.y > window.innerHeight - SEGMENT_SIZE
      ) {
        setGameState(GameState.GAME_OVER);
      }

      return newSnake;
    });
   }, [food]);

   useEffect(() => {
    if (gameState === GameState.RUNNING && checkButtonCollision()) {
      setGameState(GameState.GAME_OVER);
    }
  }, [snake, gameState, checkButtonCollision]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        if (directionRef.current !== Direction.DOWN) {
          setDirection(Direction.UP);
          directionRef.current = Direction.UP;
        }
        break;
      case "ArrowDown":
        if (directionRef.current !== Direction.UP) {
          setDirection(Direction.DOWN);
          directionRef.current = Direction.DOWN;
        }
        break;
      case "ArrowLeft":
        if (directionRef.current !== Direction.RIGHT) {
          setDirection(Direction.LEFT);
          directionRef.current = Direction.LEFT;
        }
        break;
      case "ArrowRight":
        if (directionRef.current !== Direction.LEFT) {
          setDirection(Direction.RIGHT);
          directionRef.current = Direction.RIGHT;
        }
        break;
      case "Escape":
        setGameState((prev) =>
          prev === GameState.RUNNING ? GameState.PAUSE : prev
        );
        break;
    }
  }, []);

  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      gameInterval.current = setInterval(moveSnake, SPEED);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState, moveSnake, handleKeyPress]);

  const pauseGame = () => {
    setGameState(
      gameState === GameState.RUNNING ? GameState.PAUSE : GameState.RUNNING
    );
  };

  return (
    <>
      {gameState !== null && (
        <>
          {snake.map((segment, i) =>
            i === 0 ? (
              <Image
                key={i}
                ref={snakeHeadRef as any}
                src="/snake.png"
                alt="tete"
                width={SEGMENT_SIZE}
                height={SEGMENT_SIZE}
                className="fixed pointer-events-none z-[9999]"
                style={{
                  left: segment.x,
                  top: segment.y,
                  transform: `rotate(${
                    directionRef.current === Direction.UP
                      ? 180
                      : directionRef.current === Direction.RIGHT
                      ? 270
                      : directionRef.current === Direction.DOWN
                      ? 0
                      : 90
                  }deg)`,
                }}
              />
            ) : (
              <div
                key={i}
                className="fixed rounded-full bg-[#CDDC39] pointer-events-none z-[9999]"
                style={{
                  left: segment.x,
                  top: segment.y,
                  width: SEGMENT_SIZE,
                  height: SEGMENT_SIZE,
                }}
              />
            )
          )}


          {gameState === GameState.RUNNING && (
            <div
              className="fixed rounded-full bg-red-500 pointer-events-none z-[9999]"
              style={{
                left: food.x,
                top: food.y,
                width: SEGMENT_SIZE,
                height: SEGMENT_SIZE,
              }}
            />
          )}

          {showPopup && gameState === GameState.GAME_OVER && (
            <Alert className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 z-[10000] border-red-500">
              <AlertTitle className="text-red-500 text-xl font-bold">Game Over!</AlertTitle>
              <AlertDescription>
                <p className="mt-2">Score: {score}</p>
                <p>High Score: {highScore}</p>
              </AlertDescription>
            </Alert>
          )}

          {gameState === GameState.PAUSE && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[10000]">
              <div className="bg-background p-6 rounded-lg text-center space-y-4">
                <p className="text-lg font-bold">Paused</p>
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
                <button
                  onClick={pauseGame}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Resume
                </button>
              </div>
            </div>
          )}

          {gameState === GameState.RUNNING && (
            <div className="kill-zone fixed top-4 left-4 z-[10000] text-white bg-black/50 px-3 py-1 rounded">
              Score: {score}
            </div>
          )}
        </>
      )}
    </>
  );
}