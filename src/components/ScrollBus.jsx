import { motion, useScroll, useTransform } from "framer-motion";
import busIcon from "../assets/bus.svg";

export default function ScrollBus() {
    // 1. Lógica de Movimiento (Framer Motion)
    // Usa el hook useScroll sin target específico para scroll global
    const { scrollYProgress } = useScroll();

    // Mapea 0 (inicio página) a 1 (final página) -> 0% a 100% del recorrido
    // Transformación directa como pidió el usuario CRÍTICAMENTE.
    const pathLength = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // 2. Redefinición de la Ruta (SVG Path)
    // viewBox="0 0 100 100"
    // Inicio: M 50 0 (Centro Hero)
    // Bajada inicial: Curva suave hacia un costado (digamos derecha 90)
    // Zig-zag suave por los márgenes (10% y 90% en X)
    // Bajando hasta el 100% en Y
    const pathD = `
        M 50 0 
        C 50 5, 90 5, 90 15 
        S 10 30, 10 45 
        S 90 60, 90 75 
        S 50 95, 50 100
    `.replace(/\s+/g, ' ').trim();

    return (
        // 3. Contenedor Elástico
        <div
            className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
            style={{ width: "100%", height: "100%" }}
        >
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                {/* Visual Guide Rail (Opcional, para ver la ruta) */}
                <path
                    d={pathD}
                    stroke="#f59e0b"
                    strokeWidth="0.2" // Más fino porque el viewBox es pequeño
                    strokeDasharray="1 1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.4"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            {/* THE BUS ACTOR */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "60px",
                    height: "60px",
                    // El truco de offset-path en CSS nativo
                    offsetPath: `path("${pathD}")`,
                    offsetDistance: pathLength,
                    offsetRotate: "auto 90deg", // Ajustar rotación si el SVG del bus apunta arriba/derecha
                }}
            >
                <img
                    src={busIcon}
                    alt="Bus"
                    className="w-full h-full drop-shadow-xl"
                // Si el SVG original del bus apunta hacia arriba, y el camino baja, quizás necesite rotación extra.
                // Asumiremos que el bus apunta a la derecha por defecto.
                // Si offsetRotate es auto, alinea el eje X del elemento con la tangente.
                />
            </motion.div>
        </div>
    );
}
