import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function MyPage() {
  const navigate = useNavigate();
  const [ userName, setUserName ] = useState();
  const [ following, setFollowing ] = useState(0);
  const [ follower, setFollower ] = useState(0);

  const createRestaurant = () => {
    navigate("/ct/my");
  }

  useEffect(() => {
    const userInfo = window.localStorage.getItem("data");
    setUserName(JSON.parse(userInfo)['properties']['nickname']);
  }, [])

  return (
    <main className="main">
      <section className="section pt-[24px]">
        <section className="container gutter-sm">
          <div className="mypage-profile flex items-start mb-[16px]">
            <div className="profile-pic mr-[12px]">
              <div className="img"></div>
            </div>
            <div className="mypage-profile-meta">
              <h4 className="name">{userName}</h4>
              <div className="meta">
                <dl className="flex gap-5">
                  <dt>팔로잉</dt>
                  <dd>{following}</dd>
                </dl>
                <span>|</span>
                <dl className="flex gap-5">
                  <dt>팔로워</dt>
                  <dd>{follower}</dd>
                </dl>
              </div>
              <div className="social">
              </div>
            </div>
          </div>
          <div className="mypage-profile-btn">
            <button className="btn btn-md btn-outline btn-rounded full-width mt-18">
              <span className="label">프로필 수정</span>
            </button>
            <button className="btn btn-md btn-outline btn-rounded full-width mt-18" onClick={createRestaurant}>
              <span className="label">사장님 등록</span>
            </button>
          </div>
        </section>
        <section></section>
        <div>
          <div className="mypage-ad flex items-center">
            <div className="img"></div>
            <div>
              <p>캐치테이블이 특별한 날을 축하해드릴게요</p>
              <span>생일/기념일 등록하기<i></i></span>
            </div>
          </div>
        </div>
        <div className="tab-menu mb-[10px] sticky">
          <ul className="">
            <li className="active"><a><span>나의 저장<small className="count">0</small></span></a></li>
            <li className="active"><a><span>리뷰<small className="count">0</small></span></a></li>
          </ul>
        </div>
        <div></div>
      </section>
    </main>
  );
}

export default MyPage;
