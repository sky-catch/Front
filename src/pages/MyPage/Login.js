import React from "react";
export default function Login() {
  const REST_API_KEY = "c15a9a9c13e97723e773ab9f84558e21";
  const REDIRECT_URI = "http://15.164.89.177:8080/oauth/kakao";
  const KAKAO_AUTO_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const kakaoLogin = () => {
    window.open(KAKAO_AUTO_URL);
  };
  return (
    <section className="signin-wrapper pt-[15vh] px-[30px]">
      <h1 className="brand-title">
        <small className="text-loginTitle mb-[7px] block font-light">
          즐거운 미식 생활의 시작
        </small>
        <img
          className="w-[171px]"
          src={"https://app.catchtable.co.kr/public/img/catchtable.png"}
        />
      </h1>
      <div className="login-btn mt-[10vh]" onClick={kakaoLogin}>
        <span className="__quick relative w-[128px] h-[32px] block mb-[10px] mx-[auto]">
          <img
            src={
              "https://app.catchtable.co.kr/public/img/login/kakao_tooltip.svg"
            }
          />
          <em className="text-xs font-bold text-loginText absolute text-nowrap top-[4px]  left-[10px] bottom-[0] top-0">
            5초만에 빠른 회원가입
          </em>
        </span>
        <button
          className="__kakao w-[100%] h-12 rounded-lg bg-kakaoColor flex justify-center items-center gap-x-[10px]"
          type="button"
        >
          <i className="w-[20px] h-[18px] block bg-[url('./assets/icons/kakao_button.svg')]"></i>
          <span className="">카카오로 시작</span>
        </button>
      </div>
    </section>
  );
}
