import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../respository/reservation";
export default function KakoRedirectPage() {
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  const grant_type = "authorization_code";
  const client_id = `${process.env.REACT_APP_REST_API_KEY}`;
  const client_secret = "mwtfEbotahN7vZpDOg1K0QhSg1ol6SH0";
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
  const navigate = useNavigate();

  useEffect(() => {

    getLogin(KAKAO_CODE)
      .then((res) => {
        const { accessToken } = res.data;
        navigate("/");
        localStorage.clear();
        // localStorage.setItem("id", res.data.id);
        // localStorage.setItem("data", JSON.stringify(res.data));
        localStorage.setItem("token", accessToken);
      }).catch(err=>{
        console.log('err>>',err)
      })
  
  }, [KAKAO_CODE]);

  return <div> Loading...</div>;
}
