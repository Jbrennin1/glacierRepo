module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        lightTheme: {
          "base-100": "#FFFFFF",
          "base-200": "#EBEBEB",
          "base-300": "#E6E6E6",
          "base-400": "#D0D0D0",
          primary: "#525252",
          secondary: "#656565",
          accent: "#000000",
        },
      },
      {
        darkTheme: {
          "base-100": "#191D24",
          "base-200": "#FFFFFF",
          "base-300": "#232933",
          "base-400": "#D0D0D0",
          primary: "#C6CFDE",
          secondary: "#A9A9A9",
          accent: "#FFFFFF",
        },
      },
      {
        darkCherryTheme: {
          "base-100": "#101020",
          "base-200": "#191D24",
          "base-300": "#232933",
          "base-400": "#D0D0D0",
          primary: "#ec275f",
          secondary: "#f25477",
          accent: "#FFFFFF",
        },
      },
      {
        cherryTheme: {
          "base-100": "#FFFFFF",
          "base-200": "#d4e0ee",
          "base-300": "#ffdbdb",
          "base-400": "#D0D0D0",
          primary: "#ec275f",
          secondary: "#f25477",
          accent: "#000000",
        },
      },
      {
        orangeTheme: {
          "base-100": "#191D24",
          "base-200": "#040506",
          "base-300": "#232933",
          "base-400": "#D0D0D0",
          primary: "#ffa600",
          secondary: "#d9ff00",
          accent: "#FFFFFF",
        },
      },
    ],
  },
  theme: {
    extend: {
      cursor: {
        minus:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect x='5' y='11' width='14' height='2' fill='%23000' stroke='%23FFF' stroke-width='1'/%3E%3C/svg%3E\") 12 12, auto",
      },
      animation: {
        colorShift: "shift 1s linear infinite",
      },
      keyframes: {
        shift: {
          "0%, 100%": { backgroundColor: "primary" },
          "50%": { backgroundColor: "secondary" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
