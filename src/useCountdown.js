import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown({ minutes, mode, onStart, onStop, onComplete }) {
  const timerId = useRef(null);
  const initialTime = minutes * 60;
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTime] = useState(initialTime);
  const [ticking, setTicking] = useState(false);

  const clear = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTime(timeLeft - 1);
      setProgress((count) => count + 1);
    }
    if (timeLeft <= 1) {
      setTicking(false);
      clear();
      onComplete?.();
    }
  }, [onComplete, timeLeft]);

  useEffect(() => {
    if (ticking) {
      timerId.current = setInterval(tick, 1000);
    } else {
      clear();
    }

    return clear;
  }, [tick, ticking]);

  useEffect(() => {
    // Reset the timer based on the current mode
    setTime(initialTime);
    setProgress(0);
  }, [initialTime, mode]);

  const start = useCallback(() => {
    setTicking(true);
    onStart?.();
  }, [onStart]);

  const stop = useCallback(() => {
    setTicking(false);
    onStop?.();
  }, [onStop]);

  const reset = useCallback(() => {
    setTicking(false);
    setProgress(0);
    setTime(initialTime);
    onStop?.();
  }, [initialTime, onStop]);

  return {
    start,
    stop,
    reset,
    ticking,
    timeLeft,
    progress: (progress / initialTime) * 100,
  };
}
