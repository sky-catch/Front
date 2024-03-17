import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function KakoRedirectPage() {
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  const grant_type = "authorization_code";
  const client_id = `${process.env.REACT_APP_REST_API_KEY}`;
  const client_secret = "mwtfEbotahN7vZpDOg1K0QhSg1ol6SH0";
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
  const navigate = useNavigate();

  useEffect(() => {
    // axios
    //   .get(
    //     `http://15.164.89.177:8080/oauth/login/KAKAO?code=${KAKAO_CODE}`,
    //     {},
    //     {
    //       headers: {
    //         accept: "*/*",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     const access_token = res.data.accessToken;
    //     console.log("res1", access_token);
    //     axios
    //       .get(
    //         `https://kapi.kakao.com/v2/user/me`,
    //         {},
    //         {
    //           headers: {
    //             Authorization: `Bearer ${access_token}`,
    //             "Content-type":
    //               "application/x-www-form-urlencoded;charset=utf-8",
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         console.log("res2", res.data);
    //       })
    //       .catch((error) => {
    //         console.log("2번쨰 error", error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri${REDIRECT_URI}&code=${KAKAO_CODE}&client_secret=${client_secret}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const { access_token } = res.data;

        axios
          .post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then((res) => {
            // console.log("2번쨰", access_token);
            navigate("/");
            localStorage.clear();
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("data", JSON.stringify(res.data));
          })
          .catch((error) => {
            console.log("2번쨰 error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [KAKAO_CODE]);

  return <div> Loading...</div>;
}
