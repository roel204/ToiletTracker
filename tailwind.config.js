/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'bgLight': '#eff6ff',
                'bgDark': '#1e293b',
                'panelLight': '#cbd5e1',
                'panelDark': '#29344d',
            },
        },
    },
    plugins: [],
}

