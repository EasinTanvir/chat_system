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
        newCustomColor: "#7D6BD6",
      },

      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #3b82f6, #9333ea)", // equivalent to from-blue-500 to-purple-600
        "custom-gradient-2": "linear-gradient(to left, #3b82f6, #f43f5e)",
        "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)",
      },
    },
  },
  plugins: [],
};
