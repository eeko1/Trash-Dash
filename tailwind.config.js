/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      main_light_turquoise: '#64C3CD',
      main_medium_turquise: '#00AAA3',
      main_dark_turquoise: '#008782',
      main_black: '#2C2A29',
      support_pink: '#D8318A',
      support_red: '#BD3429',
      support_dark_red: '#7A1E1E',
      support_light_red: '#ff0f0f',
      support_dark_orange: '#BE4D00',
      support_orange: '#EA7600',
      support_yellow: '#F9D800',
      support_brown: '#4E3629',
      support_dark_green: '#006431',
      support_medium_green: '#009F4D',
      support_light_green: '#74AA50',
      support_purple: '#814494',
      support_dark_blue: '#006AA7',
      support_light_blue: '#9BCBEB',
    },
    fontFamily: {
      sans: ['Inter', 'Arial', 'sans-serif'],
    },
  },
};
export const plugins = [];