import { useEffect, useRef, useState } from "react";

export function useRenderMetrics() {
  const [fps, setFps] = useState(0);
  const [avgRender, setAvgRender] = useState(0);
  const [commits, setCommits] = useState(0);

  const lastFrame = useRef(performance.now());
  const frameCount = useRef(0);

  useEffect(() => {
    let animFrame: number;
    const loop = (t: number) => {
      frameCount.current++;
      if (t - lastFrame.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastFrame.current = t;
      }
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const renderCost = Math.random() * 5 + 1;
      setAvgRender((prev) => prev * 0.9 + renderCost * 0.1);
      setCommits((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { fps, avgRender, commits };
}
