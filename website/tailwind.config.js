module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx", "./blogposts/*.md"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
