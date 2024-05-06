/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        kakaoColor: "#fee500",
        loginTitle: "#666",
        loginText: "#ff3d00",
        "point" : "#FF6632",
      },
      backgroundImage: {
        main : "url('./assets/icons/logo.png')",
        kakaoIcon: "url('./assets/icons/kakao_button.svg')",
        alarmIcon: "url('./assets/icons/alarm-normal.svg')",
        closeIcon: "url('./assets/icons/close.svg')",
      },
    },
  },
  plugins: [],
};
