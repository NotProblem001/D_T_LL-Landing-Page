import { motion, useScroll, useTransform } from "framer-motion";
import busIcon from "../assets/bus.svg";

export default function ScrollBus() {
    const { scrollYProgress } = useScroll();

    // Transformamos el scroll 0-1 a porcentaje 0%-100% para 'offsetDistance'
    // Aceleración al final: Mapeamos para que llegue al 100% del recorrido antes de terminar el scroll (ej: al 90%)
    const pathLength = useTransform(scrollYProgress, [0, 0.9], ["-5%", "110%"]);

    // Opacidad: 0 al inicio, 1 rápido, se mantiene casi hasta el final (0.8), y desaparece antes (0.85)
    // Ajustado para que se desvanezca "un poco antes" como pidió el usuario, manteniendo la velocidad visual
    const busOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.95], [0, 1, 1, 0]);

    // Ruta original de Mati, mejorada con curvas 'Q' para giros fluidos del autobús
    const pathD = "M 57 15.8 L 57 17.5 Q 57 19.5, 59 19.5 L 93 19.5 Q 95 19.5, 95 21.5 L 95 32.3 Q 95 34.3, 93 34.3 L 6 34.3 Q 4 34.3, 4 36.3 L 4 50.2 Q 4 52.2, 6 52.2 L 93 52.2 Q 95 52.2, 95 54.2 L 95 60.5 Q 95 62.5, 93 62.5 L 6 62.5 Q 4 62.5, 4 64.5 L 4 73 Q 4 75, 6 75 L 22.1 75";

    return (
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-40">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                {/* 1. Base de la calle (Gris medio) */}
                <path
                    id="ruta-bus"
                    d={pathD}
                    stroke="#6e6e6b"
                    strokeWidth="4"
                    opacity="0.1"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                />

                {/* 2. Línea punteada central (Oro Real) */}
                <path
                    d={pathD}
                    stroke="#ffc914"
                    strokeWidth="4"
                    strokeDasharray="13 16"
                    opacity="0.8"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                />

                {/* 3. El Autobús animado seguidor */}
                <motion.g
                    style={{
                        offsetPath: "url(#ruta-bus)",
                        offsetDistance: pathLength,
                        offsetRotate: "auto 0deg", // Ajuste para que el frente del bus siga la línea
                        opacity: busOpacity
                    }}
                >
                    {/* Icono del Bus */}
                    {/* width/height="4" y x/y="-2" para centrarlo en el path */}
                    <image
                        href={busIcon}
                        width="2.5"
                        height="2.5"
                        x="-1.25"
                        y="-1.25"
                        preserveAspectRatio="xMidYMid meet"
                    />
                </motion.g>
            </svg>
        </div>
    );
}
