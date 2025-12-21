import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import busIcon from "../assets/bus.svg";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrollBus() {
    const containerRef = useRef(null);
    const busRef = useRef(null);
    const maskCircleRef = useRef(null); // Reference for the mask circle
    const pathRef = useRef(null);
    const [pathD, setPathD] = useState("");

    const calculatePath = () => {
        if (!containerRef.current) return;

        // Sections IDs
        const sections = ["inicio", "servicios", "valoraciones", "galeria", "contacto"];
        const points = [];
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;

        // Configuration
        const sidePadding = containerWidth * 0.05;
        const rightX = containerWidth - sidePadding;
        const leftX = sidePadding;
        const centerX = containerWidth / 2;

        sections.forEach((id, index) => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                const relativeTop = rect.top - containerRect.top;
                const relativeBottom = rect.bottom - containerRect.top;
                const sectionCenterY = relativeTop + rect.height / 2;

                if (id === "inicio") {
                    // Start
                    points.push({ x: centerX, y: relativeBottom - 100 });
                } else if (id === "contacto") {
                    // Drive DEEPER into parking (Inside the form area essentially)
                    const entryX = rightX;

                    // Move in to the section
                    points.push({ x: entryX, y: sectionCenterY });

                    // Final stop spot: Curve heavily into the block
                    // Assuming contact form is on right or center, let's pull to center-right
                    // relativeBottom is end of section. We want to stop before that.

                    // Create a little "garage" curve?
                    // Go down then hook left into the content?
                    points.push({ x: entryX, y: relativeBottom - 150 });
                    points.push({ x: entryX - 100, y: relativeBottom - 150 }); // Park horizontal
                } else {
                    const isRight = index % 2 !== 0;
                    const targetX = isRight ? rightX : leftX;

                    points.push({ x: targetX, y: relativeTop + 50 });
                    points.push({ x: targetX, y: relativeBottom - 50 });
                }
            }
        });

        if (points.length < 2) return;

        let d = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];

            const dx = p2.x - p1.x;
            const absDx = Math.abs(dx);
            const dy = p2.y - p1.y;

            if (absDx < 50 && Math.abs(dy) > 50) {
                // Vertical
                d += ` L ${p2.x} ${p2.y}`;
            } else if (Math.abs(dy) < 50) {
                // Horizontal (Final Parking)
                d += ` L ${p2.x} ${p2.y}`;
            } else {
                // Corners
                const midY = (p1.y + p2.y) / 2;
                const radius = 30;

                d += ` L ${p1.x} ${midY - radius}`;
                const turnDir = dx > 0 ? 1 : -1;
                d += ` Q ${p1.x} ${midY} ${p1.x + turnDir * radius} ${midY}`;
                d += ` L ${p2.x - turnDir * radius} ${midY}`;
                d += ` Q ${p2.x} ${midY} ${p2.x} ${midY + radius}`;
                d += ` L ${p2.x} ${p2.y}`;
            }
        }

        setPathD(d);
    };

    useEffect(() => {
        const timer = setTimeout(calculatePath, 100);
        window.addEventListener("resize", calculatePath);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", calculatePath);
        };
    }, []);

    useEffect(() => {
        if (!pathD || !busRef.current || !maskCircleRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5, // Reduced scrub for tighter sync ("no se queda atras")
            }
        });

        // Motion Path for Bus
        tl.to(busRef.current, {
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
            },
            ease: "none",
            duration: 1
        }, 0);

        // Motion Path for Mask Circle (Hides the line)
        // Must match bus movement exactly
        tl.to(maskCircleRef.current, {
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                autoRotate: true, // Rotation doesn't matter for circle but good for alignment logic
                alignOrigin: [0.5, 0.5],
            },
            ease: "none",
            duration: 1
        }, 0);

        // Hide at end
        tl.to(busRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.05, // Short fade relative to total
            ease: "power1.in"
        }, 0.95); // At 95% of progress

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [pathD]);

    return (
        <div
            ref={containerRef}
            className="scroll-bus"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
                overflow: "hidden"
            }}
        >
            <svg
                style={{
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <defs>
                    <mask id="busMask">
                        {/* White rect = show everything */}
                        <rect x="-50%" y="-50%" width="200%" height="200%" fill="white" />
                        {/* Black shape = hide this part (The Bus) */}
                        {/* We use a group or just the circle. The circle moves via GSAP. */}
                        <circle
                            ref={maskCircleRef}
                            r="35" // Slightly larger than bus half-width (60px / 2 = 30)
                            fill="black"
                        />
                    </mask>
                </defs>

                <path
                    ref={pathRef}
                    d={pathD}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="5"
                    strokeDasharray="15, 10"
                    strokeLinecap="round"
                    style={{ opacity: 0.6 }}
                    mask="url(#busMask)"
                />
            </svg>

            <img
                ref={busRef}
                src={busIcon}
                alt="Bus"
                style={{
                    width: "60px",
                    height: "60px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: "translate(-50%, -50%)",
                    opacity: pathD ? 1 : 0
                }}
            />
        </div>
    );
}
