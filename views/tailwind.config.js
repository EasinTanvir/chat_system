/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        headerColor: "#242530",
        textColor: "#ffffff",
        btnColor: "#0172F4",
        noteColor: "#FFCF7C",
      },
    },
  },
  plugins: [],
};
