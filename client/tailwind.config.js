/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans'],
      },
      animation: {
        'bg-move': 'b 0.2s infinite alternate',
      },
      keyframes: {
        b: {
          '100%': { backgroundPosition: '50% 0, 60% 50%' },
        },
      },
      boxShadow: {
        'inset-0px-16px-a85103': 'inset 0px 16px #a85103, inset 0px 16px 1px 1px #a85103',
      },
      clipPath: {
        'polygon-antenna1': 'polygon(50% 0%, 49% 100%, 52% 100%)',
        'polygon-antenna2': 'polygon(47% 0, 47% 0, 34% 34%, 54% 25%, 32% 100%, 29% 96%, 49% 32%, 30% 38%)',
      } 
    },
  },
  plugins: [],
};

export default config;