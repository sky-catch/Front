import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { LoginState, RestaurantState } from "../../States/LoginState";
import {
  getMyRestaurant,
  getOwner,
  getUserInfo,
} from "../../respository/userInfo";

/**
 * 마이페이지
 * @author jimin
 */

function MyPage() {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(LoginState);
  const [restaurant, setRestaurant] = useRecoilState(RestaurantState);

  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  const [isSelect, setIsSelect] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [owner, setOwner] = useState([]);
  const [isSave, setIsSave] =
    useState(true); /* 탭 true : 나의 저장, false : 리뷰 */

  /* Function : 프로필 수정 */
  const updateUserInfo = () => {
    navigate("/my/myProfileInfo");
  };

  /* Function : 식당 정보 관리 */

  // 사장 생성
  const createOwner = () => {
    navigate(`/owner`);
  };

  /* Tap 선택 */
  const menuClick = (e, index) => {
    if (index === 0) {
      setIsSelect(true);
      setIsSave(true);
    } else {
      setIsSelect(false);
      setIsSave(false);
    }
  };

  /* Function : 식당 정보 */
  const getMyShop = () => {
    getMyRestaurant().then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        console.log("res", res);
        setIsOwner(res.data.owner);
      })
      .catch((err) => {
        console.log("err", err);
      });
    // getUserShop();
  }, []);

  // 내 식당 관리 페이지
  const {
    data: getRestaurantItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyRestaurant"],
    queryFn: () => {
      return getMyRestaurant()
        .then((res) => {
          console.log("res", res);
          if (res === undefined) {
            throw new Error("Data is undefined");
          }
          return res;
        })
        .catch((err) => {
          console.log("err1", err.response);
        });
    },
    enabled: isOwner,
  });

  const { data: getOwnerItem } = useQuery({
    queryKey: ["getOwner"],
    queryFn: () => {
      return getOwner()
        .then((res) => {
          if (res === undefined) {
            throw new Error("Data is undefined");
          }
          return res;
        })
        .catch((err) => {
          console.log("err2", err);
          throw err;
        });
    },
    enabled: isOwner,
  });

  useEffect(() => {
    if (getOwnerItem && getOwnerItem.ownerId !== null) {
      setIsOwner(true);
      getSavedShop();
      if (isOwner) {
        setUser((prevUser) => ({
          ...getOwnerItem,
        }));
      }
      if (getRestaurantItem) {
        console.log("정보가 있을때");
        setIsRestaurant(true);

        setRestaurant((prevUser) => ({
          ...getRestaurantItem,
        }));
      }
    }
  }, [getRestaurantItem, isOwner]);

  /* Function : 식당 정보 관리 */
  const manageRestaurant = () => {
    navigate(`/my/myshop?owner=${getOwnerItem.ownerId}`);
  };

  /* Function : 로그인 유저 회원정보 조회 */
  const getSavedShop = () => {
    getUserInfo().then((res) => {
      console.log(res.data);
    });
  };

  const createRestaurant = () => {
    navigate(`/my/myshop/edit/:add`);
  };

  return (
    <MainContents className="main">
      {/* 프로필정보 */}
      <section className="section pt-[24px]">
        <section className="container gutter-sm">
          <div className="mypage-profile flex items-start mb-[16px]">
            <div className="profile-pic mr-[12px]">
              <div className="img"></div>
            </div>
            <div className="mypage-profile-meta">
              <div className="userInfo flex">
                <h4 className="name">{user.nickname}</h4>
                {isOwner ? (
                  <div className="isOwner flex">
                    <FaStar color="#ff3d00"></FaStar>
                  </div>
                ) : (
                  ""
                )}
              </div>
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
              <div className="social"></div>
            </div>
          </div>
          <div className="mypage-profile-btn flex ">
            <button
              className="btn btn-md btn-outline btn-rounded mt-18"
              onClick={updateUserInfo}
            >
              <span className="label">프로필 수정</span>
            </button>
            <button
              className="btn btn-md btn-outline btn-rounded mt-18"
              onClick={
                isOwner
                  ? isRestaurant
                    ? manageRestaurant
                    : createRestaurant
                  : createOwner
              }
            >
              <span className="label">
                {isOwner
                  ? isRestaurant
                    ? "내 식당 관리"
                    : "내 식당 등록"
                  : "사장님 등록"}
              </span>
            </button>
          </div>
        </section>
        {/* 예약확인 */}
        <section className="section section-overflow-hidden"></section>
        {/* 배너 */}
        <div>
          <div className="mypage-ad flex items-center">
            <img src="https://app.catchtable.co.kr/public/img/Anniversary/anniversary-cake.svg"></img>
            <div>
              <p>캐치테이블이 특별한 날을 축하해드릴게요</p>
              <span>
                생일/기념일 등록하기<i></i>
              </span>
            </div>
          </div>
        </div>
        {/* 탭 */}
        <div>
          <ul className="tab-menu sticky top-[47px] mb-[10px] bg-white">
            <li
              className={`w-[50%] leading-[48px] text-center ${
                isSelect ? " active" : ""
              }`}
              onClick={(e) => menuClick(e, 0)}
            >
              나의 저장
            </li>
            <li
              className={`w-[50%] leading-[48px] text-center ${
                isSelect ? "" : "active"
              }`}
              onClick={(e) => {
                menuClick(e, 1);
              }}
            >
              리뷰
            </li>
          </ul>
          {isSave ? (
            <div className="collection">
              {/* <section className="section pt-[20px]">
                <div className="container gutter-sm">
                  <div className="section-header justify-between">
                    <h3 className="section-title">
                      컬렉션<span className="count">0</span>
                    </h3>
                  </div>
                  <button className="btn btn-lg btn-outline full-width margin-custom">
                    <span className="add">새 컬렉션 만들기</span>
                  </button>
                </div>
              </section> */}
              <section className="section pt-[20px]">
                <div className="container gutter-sm">
                  <div className="__d-flex">
                    <div className="section-header justify-between full-width">
                      <h3 className="section-title flex">
                        저장한 레스토랑<span className="count">0</span>
                      </h3>
                      <div className="__d-flex __v-center font-12">
                        전체보기
                        <img src="https://app.catchtable.co.kr/public/img/icons/arrow-right-20.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="section-body pb-32">
                    <div className="saved-restaurant-list"></div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="review"></div>
          )}
        </div>
      </section>
    </MainContents>
  );
}

export default MyPage;
const MainContents = styled.div`
  padding-bottom: 48px;
  box-sizing: border-box;
  height: calc(100vh - 47px);

  /* 개인프로필 */
  .mypage-profile .profile-pic .img {
    background-image: url("https://app.catchtable.co.kr/public/img/noimg/profile_default_v2.png");
    background-size: 100%;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
  }
  /* 개인정보 */
  .mypage-profile .mypage-profile-meta {
    position: relative;
    flex: 1;
    min-width: 0;
    padding-top: 15px;
  }
  .mypage-profile-meta .name {
    display: flex;
    font-size: 16px;
    font-weight: 700;
  }
  .mypage-profile-meta .meta {
    display: flex;
    gap: 10px;
    margin-top: 5px;
  }
  .meta {
    align-items: baseline;
    line-height: 14px;
  }
  .mypage-profile-meta .meta dl {
    display: flex;
    gap: 5px;
  }
  .mypage-profile-meta .meta dl dt {
    color: #666;
    font-size: 12px;
  }
  .mypage-profile-meta .meta dl dd {
    font-weight: 700;
    color: #000;
    font-size: 14px;
  }
  /* 버튼관련 */
  .mypage-profile-btn {
    justify-content: space-between;
    gap: 5px;
  }
  .mypage-profile-btn .btn {
    flex: 1;
    // margin-top : 18px !important;
  }
  /* 배너 */
  .mypage-ad {
    padding: 20px 30px;
    gap: 12px;
    background-color: #f4f4f4;
    margin-top: 28px;
  }
  .mypage-ad p {
    color: #222222;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
  }
  .mypage-ad span {
    color: #222222;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    display: flex;
    align-items: center;
  }
  .mypage-ad span i {
    width: 16px;
    height: 16px;
    display: block;
    background: url("https://app.catchtable.co.kr/public/img/icons/arrow-right.svg")
      50% 50% no-repeat;
  }
  /* 나의 저장 */
  .section .section-header .section-title {
    font-weight: 700;
    letter-spacing: 0;
    font-size: 16px !important;
    display: flex;
  }
  .section .section-header .section-title span {
    font-size: 14px;
    color: #999;
    margin-left: 8px;
    font-weight: 400;
  }
  .section .margin-custom {
    margin: 28px 0 24px 0;
  }
  .section .section-header .section-title .count {
    font-size: 14px;
    color: #999;
    margin-left: 8px;
    font-weight: 400;
  }
  .font-size img {
    margin-left: 4px;
    width: 16px;
    height: 16px;
  }
`;
