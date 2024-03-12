/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                shine: "shine 0.8s",
            },
            keyframes: {
                shine: {
                    "100%": { left: "150%" },
                },
            },
        },
    },
    plugins: [],
}