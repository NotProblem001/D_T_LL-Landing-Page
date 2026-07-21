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
                    blueDark: '#274465',  // Variante oscura para hover/active
                    blueLight: '#e8eef5', // Fondo suave para estados seleccionados
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
                // Questrial sustituye a ITC Avant Garde (comercial, nunca llegó a cargarse).
                // Geométrica y de proporciones similares; disponible en Google Fonts.
                sans: ['Questrial', 'system-ui', 'sans-serif'],
                display: ['Questrial', 'system-ui', 'sans-serif'],
                body: ['Questrial', 'system-ui', 'sans-serif'],
                // Alias conservados para no romper el markup existente (ver Hero.jsx).
                // Questrial tiene un solo peso: el énfasis se consigue con font-semibold/font-bold.
                'avant-garde-medium': ['Questrial', 'system-ui', 'sans-serif'],
                'avant-garde-bold': ['Questrial', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
