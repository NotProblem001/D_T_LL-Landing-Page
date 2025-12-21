import { useEffect, useRef } from "react";
import bus from "../assets/bus.svg";
import "../styles/scrollpath.css";

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
          d="M600,100 C600,300 800,500 600,700
             S400,900 600,1100
             S800,1300 600,1500
             S400,1700 600,1900
             S800,2100 600,2300
             S400,2500 600,2700
             S800,2900 600,3100
             S400,3300 600,3500
             S800,3700 600,3900
             S400,4100 600,4300
             S800,4500 600,4700
             S400,4900 600,5100
             S800,5300 600,5500
             S400,5700 600,5900"
          fill="none"
          stroke="#ddd"
          strokeWidth="4"
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
