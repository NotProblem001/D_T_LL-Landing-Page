import { useEffect, useRef } from "react";
import bus from "../assets/bus.svg";
import "../styles/scrollpath.css";

// Mobile check hook or simple CSS suppression is typically better.
// We will use CSS to hide it on mobile as requested.

export default function ScrollPath() {
  const busRef = useRef(null);

  useEffect(() => {
    const bus = busRef.current;
    const path = document.getElementById("thePath");

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / maxScroll;

      const length = path.getTotalLength();
      const point = path.getPointAtLength(progress * length);

      bus.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <svg id="svgPath" viewBox="0 0 1200 6000" width="100%" height="6000px" className="path-svg">
        <path
          id="thePath"
          d="M600,0 
             C600,400 900,600 900,1000 
             C900,1600 300,1800 300,2400
             C300,3000 900,3200 900,3800
             C900,4400 300,4600 300,5200
             C300,5600 600,5800 600,6000"
          fill="none"
          stroke="#ddd"
          strokeWidth="4"
          strokeDasharray="10,10"
        />
      </svg>
      <img
        src={bus}
        ref={busRef}
        alt="Bus animado"
        className="scroll-bus"
      />
    </>
  );
}
