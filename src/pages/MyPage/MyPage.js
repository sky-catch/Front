import React, { useEffect, useState } from "react";

function MyPage() {
  const [ userName, setUserName ] = useState()
  const [ following, setFollowing ] = useState(0)
  const [ follower, setFollower ] = useState(0)

  useEffect(() => {
    const userInfo = window.localStorage.getItem("data");
    setUserName(JSON.parse(userInfo)['properties']['nickname'])
    console.log();
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
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default MyPage;
