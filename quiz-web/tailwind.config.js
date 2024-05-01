/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#163E56',
        secondary: '#F2B41C',
        customYellowBorder: '#F9DC30',
        customBlue: '#1A3EEC',
        customYellowBg: '#FFF8CC',
        customBuleBg: '#1A3EEC',
        custom_gray: '#EFEFEF',
        profile_gray:'#F3ECFF',
        payment_gray:'#F8F8F8',
        quiz_back:'#F9DC30'
      },
      fontFamily: {
        studregular: ['Circular Std'],
      },  
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('flowbite/plugin')],
};
