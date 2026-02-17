/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dtll: {
                    blue: '#31547f',      // Azul Profundo
                    turquoise: '#68dfd5', // Turquesa
                    orange: '#ed6f32',    // Naranjo
                    gold: '#ffc914',      // Oro Real
                    lilac: '#ada8be',     // Lila Ceniza
                    warmWhite: '#fafaf7', // Blanco Cálido
                    gray: '#6e6e6b',      // Gris Medio
                    warmTurquoise: '#465b86', // Turquesa Cálido
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['"ITC Avant Garde Gothic"', 'Questrial', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
