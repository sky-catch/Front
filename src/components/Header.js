import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchByKeyword } from "../respository/search.js";

/**
 * Header (헤더)
 *
 * @param {*} param0
 * @returns
 */
const Header = ({ setSearch, updateSearch }) => {
  const [searchRes, setSearchRes] = useState({}); // 검색결과
  const location = useLocation().pathname;
  const state = useLocation().state;
  const navigate = new useNavigate();
  const searchInput = useRef();

  useEffect(() => {
    setSearch(searchRes);
    updateSearch(searchRes);

    // 뒤로가기 했을 때
    if (Object.keys(searchRes).length > 0 && searchInput.current != null) {
      searchInput.current.defaultValue = searchRes.input;
    }
  }, [location, searchRes]);

  const onClickBack = () => {
    if (location === "/my/myshop/edit") {
      alert("변경한 내용이 저장되지 않습니다.");
    }
    window.history.back();
    setSearchRes({});
  };

  const onEditRestaurant = () => {
    navigate("/my/myshop/edit/:update");
  };

  const onClickMove = (param) => {
    var name = "";
    console.log(param);
    if (param == "/") {
      name = "/search/total";
    } else if (param == "mypage") {
      name = "/my";
    } else if (param == "home") {
      name = "/";
    }
    navigate(name);
  };
  const onNotifications = () => {
    navigate("/my/myshop/notifications");
  };
  const headerContent = () => {
    switch (location) {
      case "/":
        return (
          <div className="header-wrapper flex justify-between w-full px-[20px] items-center">
            <div className="header-left items-center">
              <h1 className="w-[30px] h-[30px] bg-main bg-[30px] bg-no-repeat mr-[8px]"></h1>
            </div>
            <form className="keyword-search keyword-search-main">
              <input
                className="pl-[44px] pr-[15px] text-xs h-[30px]"
                type="text"
                placeholder="지역, 음식, 매장명 검색"
                onClick={(e) => {
                  onClickMove(location, e);
                }}
              ></input>
            </form>
            <div className="header-right flex">
              <a
                className="w-[30px] h-[30px] bg-bookmark bg-[30px] bg-no-repeat ml-[8px]"
                onClick={(e) => {
                  onClickMove("mypage", e);
                }}
              ></a>
              <button className="w-[30px] h-[30px] bg-alert bg-[30px] bg-no-repeat ml-[8px]"></button>
            </div>
          </div>
        );
      case "/ct/shop":
        return (
          <div className="header-tp-wrapper flex justify-between w-full px-[20px] items-center opacity-100 h-[48px]">
            <div className="header-left items-center flex gap-[12px]">
              <a className="back header-icon" onClick={onClickBack}></a>
              <a className="tohome header-icon">홈</a>
            </div>
            <div className="header-right flex gap-[12px]">
              {/* <button className="bookmark header-icon">저장</button> */}
              <a className="share header-icon">공유</a>
            </div>
          </div>
        );
      case "/search":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              검색하기
            </h1>
          </div>
        );
      case "/search/total":
        let data = {
          city: null,
          cityRestaurantCount: 0,
          hotPlace: null,
          hotPlaceRestaurantCount: 0,
          category: null,
          categoryRestaurantCount: 0,
          restaurantSummaryDTOList: [],
        };

        const handleSearch = (e) => {
          var text = "";
          if (e.target.value.length >= 2) {
            text = e.target.value;
            searchByKeyword(text).then((res) => {
              data = res.data;
              //검색어 추가
              data.input = e.target.value;
              // 검색 결과가 아무것도 없으면 searchRes 는 ''
              // 검색 결과가 있으면 searchRes는 res.data
              if (res.data.city == "" && res.data.hotPlace == "") {
                setSearchRes({});
              } else {
                setSearchRes(data);
              }
            });
          } else {
            data.input = e.target.value;
            setSearchRes(data);
          }
        };

        return (
          <header>
            <div className="container header-wrapper flex items-center">
              <div>
                <a className="header-back-black" onClick={onClickBack}>
                  뒤로
                </a>
              </div>
              <form className="keyword-search keyword-search-main">
                <input
                  className="pl-[44px] pr-[15px] text-xs h-[30px]"
                  type="text"
                  placeholder="지역, 음식, 매장명 검색"
                  autoFocus
                  required
                  onChange={handleSearch}
                  ref={searchInput}
                ></input>
                <button className="btn-delete" type="reset">
                  초기화
                </button>
              </form>
            </div>
          </header>
        );
      case "/dialog":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              채팅하기
            </h1>
          </div>
        );
      case "/mydining/my":
        return (
          <div className="">
            <h1 className="text-xl h-[47px] leading-[47px] font-bold px-[20px]">
              마이다이닝
            </h1>
          </div>
        );
      case "/my":
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left flex items-center">
              <h1 className="text-xl h-[47px] leading-[47px] font-bold">
                마이페이지
              </h1>
            </div>
            <div className="header-right flex items-center ml-auto">
              <button type="button" className="btn-icon alarm"></button>
              <button type="button" className="btn-icon setting"></button>
            </div>
          </div>
        );
      case "/my/myProfileInfo":
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left items-center flex gap-[12px]">
              <a className="header-back-black" onClick={onClickBack}></a>
              <a className="text-xl h-[47px] leading-[47px] font-bold">
                프로필 수정
              </a>
            </div>
          </div>
        );
      case "/my/myshop":
        return (
          <div className="header-wrapper flex px-[20px] items-center">
            <div className="header-left items-center flex gap-[12px]">
              <a className="header-back-black" onClick={onClickBack}></a>
              <a className="text-xl h-[47px] leading-[47px] font-bold">
                식당 관리
              </a>
            </div>
            <div className="header-right flex items-center ml-auto">
              <button
                type="button"
                className="btn-icon annoucement icon"
                onClick={onNotifications}
              ></button>

              <button
                type="button"
                className="btn-icon setting icon"
                onClick={onEditRestaurant}
              ></button>
            </div>
          </div>
        );
      case "/my/myshop/notifications":
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left items-center flex gap-[12px]">
              <a className="header-back-black" onClick={onClickBack}></a>
              <a className="text-xl h-[47px] leading-[47px] font-bold">
                식당 공지 사항
              </a>
            </div>
          </div>
        );
      case "/account":
        return sessionStorage.getItem("token") !== null ? (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left flex items-center">
              <h1 className="text-xl h-[47px] leading-[47px] font-bold">
                마이페이지
              </h1>
            </div>
            <div className="header-right flex items-center ml-auto">
              <button type="button" className="btn-icon alarm"></button>
              <button type="button" className="btn-icon setting"></button>
            </div>
          </div>
        ) : (
          ""
        );
      case "/chat":
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left items-center flex gap-[12px] w-[100%] justify-between">
              <a className="header-back-black z-50" onClick={onClickBack}></a>
              <a className="text-xl h-[47px] leading-[47px] font-bold text-center absolute left-0 right-0 z-0 w-auto">
                실시간 채팅 상담
              </a>
              {/* <a className="icon"></a> */}
            </div>
          </div>
        );
      case "/paymentpage":
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left items-center flex w-[100%] justify-between">
              <a
                className="header-back-black w-[48px]"
                onClick={onClickBack}
              ></a>
              <span className=" absolute left-0 right-0 text-[20px] text-center font-semibold">
                {state ? JSON.parse(state).name : ""}
              </span>
            </div>
          </div>
        );
      case "/owner":
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left items-center flex w-[100%] justify-start">
              <a
                className="header-back-black w-[48px]"
                onClick={onClickBack}
              ></a>
              <span className=" text-[20px]  font-semibold">
                사장님 인증하기
              </span>
            </div>
          </div>
        );
      case "/ct/shop/reservation/form":
        return (
          <div className="header-wrapper flex px-[20px]">
            <div className="header-left items-center flex gap-[12px]">
              <button className="header-close" onClick={onClickBack}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4L4 20"
                    stroke="#222222"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M4 4L20 20"
                    stroke="#222222"
                    stroke-width="1.5"
                  ></path>
                </svg>
              </button>
              <a className="text-xl h-[47px] leading-[47px] font-bold">
                식당 이름
              </a>
            </div>
          </div>
        );
      default:
        /* 레스토랑 상세 정보 */
        if (location.indexOf("/ct/shop") != -1) {
          if (location.indexOf("/reviewList") != -1) {
            return (
              <div className="header-tp-wrapper flex justify-between w-full px-[20px] items-center opacity-100 h-[48px] bg-white">
                <div className="header-left items-center flex gap-[12px]">
                  <button className="back-b header-icon" onClick={onClickBack}>
                    뒤로
                  </button>
                  <h1>{state ? JSON.parse(state).name : ""}</h1>
                </div>
                <div className="header-right flex gap-[12px]">
                  <a className="share-b header-icon">공유</a>
                </div>
              </div>
            );
          } else {
            return (
              <div className="header-tp-wrapper flex justify-between w-full px-[20px] items-center opacity-100 h-[48px]">
                <div className="header-left items-center flex gap-[12px]">
                  <a className="back-w header-icon" onClick={onClickBack}>
                    뒤로
                  </a>
                  <a
                    className="tohome header-icon"
                    onClick={(e) => onClickMove("home", e)}
                  >
                    홈
                  </a>
                </div>
                <div className="header-right flex gap-[12px]">
                  {/* <button className="bookmark header-icon">저장</button> */}
                  <a className="share header-icon">공유</a>
                </div>
              </div>
            );
          }
        }

        if (location.indexOf("my/myshop/edit") > 0) {
          return (
            <div className="header-wrapper flex px-[20px]">
              <div className="header-left items-center flex gap-[12px]">
                <a className="header-back-black" onClick={onClickBack}></a>
                <a className="text-xl h-[47px] leading-[47px] font-bold">
                  식당 정보
                </a>
              </div>
            </div>
          );
        }

        /* 검색 결과 */
        if (location.indexOf("/search/list") != -1) {
          return (
            <div className="header-tp-wrapper flex justify-between w-full px-[20px] items-center opacity-100 h-[48px] bg-white">
              <div className="header-left items-center flex gap-[12px]">
                <button className="back-b header-icon" onClick={onClickBack}>
                  뒤로
                </button>
                <h1 className="page-title">검색결과</h1>
              </div>
            </div>
          );
        }

        break;
    }
  };
  return (
    <header
      className={`${
        location.indexOf("/ct/shop") != -1 ? "bg-transparent" : ""
      } `}
    >
      {headerContent()}
    </header>
  );
};

export default Header;
