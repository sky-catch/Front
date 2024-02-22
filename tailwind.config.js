// import './src/assets/icons/kakao_button.svg'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        kakaoColor: "#fee500",
        loginTitle: "#666",
        loginText: "#ff3d00",
      },
      backgroundImage: {
        kakaoIcon: "url('./assets/icons/kakao_button.svg')",
      },
    },
  },
  plugins: [],
};
