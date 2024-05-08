import { useEffect, useState } from "react";
import Select from "react-select";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { LoginState } from "../../States/LoginState";
import { UpdateRestaurantRes } from "../../respository/restaurant";
import { DeleteOwnerReq, getMyRestaurant } from "../../respository/userInfo";
/**
 * 식당 정보 입력 화면
 * @author jimin
 */

// const categoryOptions = [
//   { value: "SUSHI_OMAKASE", label: "스시 오마카세" },
//   { value: "HANWOO_OMAKASE", label: "한우 오마카세" },
//   { value: "STEAK", label: "스테이크" },
//   { value: "KOREAN", label: "한식" },
//   { value: "BEEF_GRILL", label: "쇠고기 그릴" },
//   { value: "CHINESE", label: "중국식" },
//   { value: "JAPANESE", label: "일본식" },
//   { value: "ITALIAN", label: "이탈리아식" },
//   { value: "FRENCH", label: "프랑스식" },
//   { value: "ASIAN", label: "아시아식" },
//   { value: "WINE", label: "와인" },
//   { value: "BEER", label: "맥주" },
//   { value: "OTHER", label: "기타" },
// ];
// const testDay = ["MODDAY", "TUESDAY"];
// const testFacility = ["PARKING"];
export default function RestaurantInfo() {
  const [user, setUser] = useRecoilState(LoginState);
  const { mutate: deleteOwner } = DeleteOwnerReq();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [isNumber, setIsNumber] = useState("");
  const { mutate: updateRestaurant } = UpdateRestaurantRes();

  const daysOptions = [
    { value: "MODDAY", label: "월" },
    { value: "TUESDAY", label: "화" },
    { value: "WEDNESDAY", label: "수" },
    { value: "THURSDAY", label: "목" },
    { value: "FRIDAY", label: "금" },
    { value: "SATURDAY", label: "토" },
    { value: "SUNDAY", label: "일" },
  ];
  // const facilityOptions = [
  //   { value: "주차", label: "PARKING" },
  //   { value: "발렛 가능", label: "VALET_PARKING" },
  //   { value: "콜키지 가능", label: "CORKAGE" },
  //   { value: "콜키지 프리", label: "CORKAGE_FREE" },
  //   { value: "대관 가능", label: "RENT" },
  //   { value: "노키즈존", label: "NO_KIDS" },
  //   { value: "와인배송", label: "WINE_DELIVERY" },
  //   { value: "레터링", label: "LETTERING" },
  //   { value: "전문 소믈리에", label: "SOMMELIER" },
  //   { value: "반려동물 동반", label: "PET" },
  //   { value: "장애인 편의시설", label: "ACCESSIBLE" },
  // ];
  const facilityOptions = [
    { value: "PARKING", label: "주차" },
    { value: "VALET_PARKING", label: "발렛 가능" },
    { value: "CORKAGE", label: "콜키지 가능" },
    { value: "CORKAGE_FREE", label: "콜키지 프리" },
    { value: "RENT", label: "대관 가능" },
    { value: "NO_KIDS", label: "노키즈존" },
    { value: "WINE_DELIVERY", label: "와인배송" },
    { value: "LETTERING", label: "레터링" },
    { value: "SOMMELIER", label: "전문 소믈리에" },
    { value: "PET", label: "반려동물 동반" },
    { value: "ACCESSIBLE", label: "장애인 편의시설" },
  ];
  const categoryOptions = [
    { value: "스시 오마카세", label: "스시 오마카세" },
    { value: "한우 오마카세", label: "한우 오마카세" },
    { value: "스테이크", label: "스테이크" },
    { value: "한식", label: "한식" },
    { value: "쇠고기 그릴", label: "쇠고기 그릴" },
    { value: "중국식", label: "중국식" },
    { value: "일본식", label: "일본식" },
    { value: "이탈리아식", label: "이탈리아식" },
    { value: "프랑스식", label: "프랑스식" },
    { value: "ASIAN", label: "아시아식" },
    { value: "와인", label: "와인" },
    { value: "맥주", label: "맥주" },
    { value: "기타", label: "기타" },
  ];
  const defaultDay = (testDay) => {
    let arryDay = [];
    daysOptions.filter((item) => {
      arryDay.push(daysOptions[testDay.indexOf(item.value)]);
    });
    console.log("arryDay", arryDay);
    return arryDay;
  };

  const defaultFacility = (testFacility) => {
    let arryFacility = [];
    facilityOptions.filter((item) => {
      arryFacility.push(facilityOptions[testFacility.indexOf(item.label)]);
    });
    console.log("testFacility", testFacility);
    return arryFacility;
  };

  const defaultCategory = (testCategory) => {
    let arryCategory = [];
    categoryOptions.filter((item) => {
      if (item.label === testCategory) {
        arryCategory.push(item);
      }
    });
    // console.log("arryCategory", arryCategory);
    return arryCategory;
  };
  /* Select 값 변경 Function */
  const handleSelectDay = (e) => {
    var selectedData = [];
    e.map((item, index) => {
      selectedData.push(item.value);
    });
    setSelectedDays(selectedData);
  };

  const handleSelectFacility = (e) => {
    var selectedData = [];
    e.map((item, index) => {
      selectedData.push(item.value);
    });

    setSelectedFacilities(selectedData);
  };

  const handleSelectCategory = (e) => {
    // var selectedData = [];
    // e.map((item, index) => {
    //   selectedData.push(item.value);
    // });
    console.log(e.value);
    setSelectedCategory(e.value);
  };

  /* 식당 저장 */
  const addRestaurantInfo = () => {
    var today = new Date();
    /* 값 설정 */
    var name = document.getElementById("name").value;
    // var category = document.getElementById("category").value;
    var content = document.getElementById("content").value;
    var phone = document.getElementById("phone").value;
    var tablePersonMax = parseInt(
      document.getElementById("tablePersonMax").value
    );
    var tablePersonMin = parseInt(
      document.getElementById("tablePersonMin").value
    );
    var openTime =
      document.getElementById("openTime").value.slice(0, 5) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);
    var lastOrderTime =
      document.getElementById("lastOrderTime").value.slice(0, 5) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);

    var closeTime =
      document.getElementById("closeTime").value.slice(0, 5) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);

    var address = document.getElementById("address").value;
    var detailAddress = document.getElementById("detailAddress").value;
    var lunchPrice = parseInt(document.getElementById("lunchPrice").value);
    var dinnerPrice = parseInt(document.getElementById("dinnerPrice").value);
    var reservationBeginDate = document.getElementById(
      "reservationBeginDate"
    ).value;
    var reservationEndDate =
      document.getElementById("reservationEndDate").value;

    var info = {
      name: name,
      category: selectedCategory,
      content: content,
      phone: phone,
      tablePersonMax: tablePersonMax,
      tablePersonMin: tablePersonMin,
      openTime: openTime,
      lastOrderTime: lastOrderTime,
      closeTime: closeTime,
      address: address,
      detailAddress: detailAddress,
      lat: user.shop.lat,
      lng: user.shop.lng,
      lunchPrice: lunchPrice,
      dinnerPrice: dinnerPrice,
      days: {
        days: selectedDays,
      },
      reservationBeginDate: reservationBeginDate,
      reservationEndDate: reservationEndDate,
      facilities: selectedFacilities,
    };
    console.log("selectedFacilities", selectedFacilities);
    console.log("selectedDays", selectedDays);
    /* 모두 필수 : 하나라도 입력하지 않은 경우 알림창 */
    if (
      !name ||
      selectedCategory.length == 0 ||
      // !content ||
      !phone ||
      !tablePersonMax ||
      !tablePersonMin ||
      !openTime ||
      !lastOrderTime ||
      !closeTime ||
      !address ||
      !detailAddress ||
      // !lunchPrice ||
      // !dinnerPrice ||
      // selectedDays.length == 0 ||
      !reservationBeginDate ||
      !reservationEndDate
      // selectedFacilities.length == 0
    ) {
      alert("식당 정보를 모두 입력해주세요");
      return;
    }
    console.log(info);

    //식당 추가
    // createRestaurant(info)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //식당 수정
    updateRestaurant(info);
  };

  /* 식당이 있으면 조회 */
  useEffect(() => {
    const prevUser = user;
    //내 식당 정보 조회 및 세팅
    getMyRestaurant().then((res) => {
      const newUser = { ...prevUser, shop: res };
      setUser(newUser);
      if (res && res.phone) {
        setIsNumber(res.phone);
      }

      if (res && res.facilities) {
        const extractedNames = res.facilities.map((item) => {
          return item.name;
        });
        console.log(extractedNames);
        setSelectedFacilities(extractedNames);
      }

      if (res && res.days.days) {
        setSelectedDays(res.days.days);
      }

      if (res && res.category) {
        setSelectedCategory(res.category);
      }
    });
  }, []);

  const inputNumber = (e) => {
    let value = e.target.value;
    const inputValue = value.replace(/\D/g, "");
    const formattedValue = inputValue.replace(
      /^\d{2,3}-\d{4}-\d{4}$/,
      (match, p1, p2, p3) => {
        let result = "";
        if (p1) result += p1;
        if (p2) result += "-" + p2;
        if (p3) result += "-" + p3;
        return result;
      }
    );
    setIsNumber(formattedValue);
  };

  // 식당 삭제
  const deleteRestaurant = () => {
    const owner = user.shop.ownerId;
    deleteOwner(owner);
  };

  return (
    <MainContents className="main">
      <div className=" h-[100%] overflow-auto">
        <div className="container gutter-sm pb-[30px]">
          <div className="form-block mb-[20px]">
            <span className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 이름</Serious>
            </span>
            <input
              type="text"
              className="form-input"
              id="name"
              placeholder="식당이름을 입력해주세요."
              defaultValue={user.shop ? user.shop.name : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">카테고리</Serious>
            </div>
            <Select
              options={categoryOptions}
              value={
                user.shop
                  ? categoryOptions.filter(function (option) {
                      return option.value === selectedCategory;
                    })
                  : ""
              }
              className="basic-multi-select"
              onChange={(e) => {
                handleSelectCategory(e);
              }}
            ></Select>
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">식당 설명</label>
            </div>
            <textarea
              className="form-input"
              id="content"
              placeholder="식당 설명을 입력해주세요."
              rows="3"
              maxLength="35"
              defaultValue={user.shop ? user.shop.content : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 전화</Serious>
            </div>
            <input
              type="text"
              className="form-input"
              id="phone"
              value={user.shop ? user.shop.phone : ""}
              placeholder="식당 전화 번호 입력해주세요. 예시 : 02-0000-0000"
              maxLength={13}
              onChange={(e) => {
                let value = e.target.value;
                const inputValue = value.replace(/\D/g, "");
                const formattedValue = inputValue.replace(
                  /^(\d{2,3})(\d{4})(\d{4})$/,
                  (match, p1, p2, p3) => {
                    let result = "";
                    if (p1) result += p1;
                    if (p2) result += "-" + p2;
                    if (p3) result += "-" + p3;
                    return result;
                  }
                );
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser.shop,
                    phone: formattedValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                한테이블 당 최대 인원
              </Serious>
            </div>
            <input
              type="number"
              className="form-input"
              id="tablePersonMax"
              min={1}
              value={user.shop ? user.shop.tablePersonMax : ""}
              placeholder="한 테이블 당 최대 인원을 입력해주세요."
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser.shop,
                    tablePersonMax: newValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                한테이블 당 최소 인원
              </Serious>
            </div>
            <input
              type="number"
              className="form-input"
              min={1}
              id="tablePersonMin"
              value={user.shop ? user.shop.tablePersonMin : ""}
              placeholder="한 테이블 당 최소 인원을 입력해주세요."
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser.shop,
                    tablePersonMin: newValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">오픈 시간</Serious>
            </div>
            <input
              type="time"
              className="form-input"
              id="openTime"
              defaultValue={user.shop ? user.shop.openTime : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                라스트 오더 시간
              </Serious>
            </div>
            <input
              type="time"
              className="form-input"
              id="lastOrderTime"
              defaultValue={user.shop ? user.shop.lastOrderTime : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">마감 시간</Serious>
            </div>
            <input
              type="time"
              className="form-input"
              id="closeTime"
              defaultValue={user.shop ? user.shop.closeTime : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 주소</Serious>
            </div>
            <input
              type="text"
              className="form-input"
              id="address"
              placeholder="식당 주소를 입력해주세요."
              defaultValue={user.shop ? user.shop.address : ""}
            />
            <input
              type="text"
              className="form-input mt-[10px]"
              id="detailAddress"
              placeholder="식당 상세 주소를 입력해주세요."
              defaultValue={user.shop ? user.shop.detailAddress : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">점심 가격</label>
            </div>
            <input
              type="number"
              className="form-input"
              id="lunchPrice"
              placeholder="점심 시간을 입력해주세요."
              value={user.shop ? user.shop.lunchPrice : ""}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser.shop,
                    lunchPrice: newValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">저녁 가격</label>
            </div>
            <input
              type="number"
              className="form-input"
              id="dinnerPrice"
              value={user.shop ? user.shop.dinnerPrice : ""}
              placeholder="저녁 가격을 입력해주세요."
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser.shop,
                    dinnerPrice: newValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">운영 날짜</label>
            </div>
            <Select
              options={daysOptions}
              value={user.shop ? defaultDay(selectedDays) : ""}
              isMulti
              className="basic-multi-select"
              onChange={handleSelectDay}
            ></Select>
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                예약 오픈 일자
              </Serious>
            </div>
            <input
              type="date"
              className="form-input"
              id="reservationBeginDate"
              required="required"
              defaultValue={user.shop ? user.shop.reservationBeginDate : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                예약 마감 일자
              </Serious>
            </div>
            <input
              type="date"
              className="form-input"
              id="reservationEndDate"
              defaultValue={user.shop ? user.shop.reservationEndDate : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">편의 시설</label>
            </div>
            <Select
              options={facilityOptions}
              value={user.shop ? defaultFacility(selectedFacilities) : ""}
              isMulti
              className="basic-multi-select"
              onChange={handleSelectFacility}
            ></Select>
          </div>
        </div>
      </div>
      <div className="h-[48px] btn btn-md btn-outline btn-rounded container flex justify-between">
        <DeleteBtn className="" onClick={deleteRestaurant}>
          식당 삭제
        </DeleteBtn>
        <InfoBtn className="" onClick={addRestaurantInfo}>
          저장
        </InfoBtn>
      </div>
    </MainContents>
  );
}

const MainContents = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 47px);
`;
const DeleteBtn = styled.button`
  border-radius: 6px;
  line-height: 48px;
  text-align: center;
  font-size: 16px;
  width: 30%;
  color: rgb(102, 102, 102);
  background-color: rgb(244, 244, 244);
`;

const InfoBtn = styled.button`
  border-radius: 6px;
  line-height: 48px;
  text-align: center;
  font-size: 16px;
  width: 65%;
  /* margin-top: 0.75rem; */
  background-color: #ff3d00;
  color: #fff;
`;

const Serious = styled.label`
  padding-left: 0px;
  position: relative;
  ::after {
    position: absolute;
    right: -9px;
    top: 0;
    content: "*";

    color: #ff3d00;
  }
`;
