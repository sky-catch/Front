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
const testDay = ["MODDAY", "TUESDAY"];
const testFacility = ["PARKING"];
export default function RestaurantInfo() {
  const [user, setUser] = useRecoilState(LoginState);
  const { mutate: deleteOwner } = DeleteOwnerReq();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
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

  const defaultDay = (testDay) => {
    let arryDay = [];
    daysOptions.filter((item) => {
      arryDay.push(daysOptions[testDay.indexOf(item.value)]);
    });

    return arryDay;
  };

  const defaultFacility = (testFacility) => {
    let arryFacility = [];
    facilityOptions.filter((item) => {
      arryFacility.push(facilityOptions[testFacility.indexOf(item.value)]);
    });

    return arryFacility;
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

  /* 식당 저장 */
  const addRestaurantInfo = () => {
    var today = new Date();
    /* 값 설정 */
    var name = document.getElementById("name").value;
    var category = document.getElementById("category").value;
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

    console.log(selectedDays);
    var info = {
      name: name,
      category: category,
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

    /* 모두 필수 : 하나라도 입력하지 않은 경우 알림창 */
    if (
      !name ||
      !category ||
      !content ||
      !phone ||
      !tablePersonMax ||
      !tablePersonMin ||
      !openTime ||
      !lastOrderTime ||
      !closeTime ||
      !address ||
      !detailAddress ||
      !lunchPrice ||
      !dinnerPrice ||
      selectedDays.length == 0 ||
      !reservationBeginDate ||
      !reservationEndDate ||
      selectedFacilities.length == 0
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
    });

    setSelectedDays(testDay);
    setSelectedFacilities(testFacility);
    setIsNumber(user.shop.phone);
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
    console.log("user", user.shop);
    const owner = user.shop.ownerId;
    deleteOwner(owner);
  };
  return (
    <MainContents className="main">
      <div className=" h-[calc(100%-48px)] overflow-auto">
        <div className="container gutter-sm pb-[30px]">
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">식당 이름</label>
            </div>
            <input
              type="text"
              className="form-input"
              id="name"
              placeholder="식당이름을 입력해주세요."
              defaultValue={user.shop.name}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">카테고리</label>
            </div>
            <input
              type="text"
              className="form-input"
              id="category"
              placeholder="카테고리를 입력해주세요."
              defaultValue={user.shop.category}
            />
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
              defaultValue={user.shop.content}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">식당 전화</label>
            </div>
            <input
              type="text"
              className="form-input"
              id="phone"
              // defaultValue={isNumber}
              value={user.shop.phone}
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
              <label className="color-gray text-[12px]">
                한테이블 당 최대 인원
              </label>
            </div>
            <input
              type="number"
              className="form-input"
              id="tablePersonMax"
              min={1}
              value={user.shop.tablePersonMax}
              // defaultValue={user.shop.tablePersonMax}
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
              <label className="color-gray text-[12px]">
                한테이블 당 최소 인원
              </label>
            </div>
            <input
              type="number"
              className="form-input"
              min={1}
              id="tablePersonMin"
              value={user.shop.tablePersonMin}
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
              <label className="color-gray text-[12px]">오픈 시간</label>
            </div>
            <input
              type="time"
              className="form-input"
              id="openTime"
              defaultValue={user.shop.openTime}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">라스트 오더 시간</label>
            </div>
            <input
              type="time"
              className="form-input"
              id="lastOrderTime"
              defaultValue={user.shop.lastOrderTime}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">마감 시간</label>
            </div>
            <input
              type="time"
              className="form-input"
              id="closeTime"
              defaultValue={user.shop.closeTime}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">식당 주소</label>
            </div>
            <input
              type="text"
              className="form-input"
              id="address"
              placeholder="식당 주소를 입력해주세요."
              defaultValue={user.shop.address}
            />
            <input
              type="text"
              className="form-input mt-[10px]"
              id="detailAddress"
              placeholder="식당 상세 주소를 입력해주세요."
              defaultValue={user.shop.detailAddress}
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
              value={user.shop.lunchPrice}
              placeholder="점심 시간을 입력해주세요."
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
              value={user.shop.dinnerPrice}
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
              defaultValue={defaultDay(testDay)}
              isMulti
              className="basic-multi-select"
              onChange={handleSelectDay}
            ></Select>
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">예약 오픈 일자</label>
            </div>
            <input
              type="date"
              className="form-input"
              id="reservationBeginDate"
              required="required"
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">예약 마감 일자</label>
            </div>
            <input type="date" className="form-input" id="reservationEndDate" />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">편의 시설</label>
            </div>
            <Select
              options={facilityOptions}
              defaultValue={defaultFacility(testFacility)}
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
  /* padding-bottom: 48px; */
  box-sizing: border-box;
  height: calc(100vh - 47px);
  /* min-height: calc(100vh - 47px); */
  /* overflow: auto; */
  margin-top: 47px;
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
