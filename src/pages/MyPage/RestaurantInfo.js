import styled from "styled-components"
import Select from "react-select";
import { createRestaurant, getRestaurant } from "../../respository/restaurant";
import { getMyRestaurant } from "../../respository/userInfo";
import { useEffect, useState } from "react";
import { LoginState } from "../../States/LoginState";
import { useRecoilState } from "recoil";

/**
 * 식당 정보 입력 화면
 * @author jimin 
 */
export default function RestaurantInfo() {
    const [user, setUser] = useRecoilState(LoginState);
    const [ selectedDays, setSelectedDays ] = useState([]);
    const [ selectedFacilities, setSelectedFacilities ] = useState([]);
    const daysOptions = [
        {value : 'MODDAY', label : '월'},
        {value : 'TUESDAY', label : '화'},
        {value : 'WEDNESDAY', label : '수'},
        {value : 'THURSDAY', label : '목'},
        {value : 'FRIDAY', label : '금'},
        {value : 'SATURDAY', label : '토'},
        {value : 'SUNDAY', label : '일'}
    ];
    const facilityOptions = [
        {value : 'PARKING', label : '주차'},
        {value : 'CORKAGE', label : '콜키지프리'}
    ];

    /* Select 값 변경 Function */
    const handleSelectDay = (e) => {
        var selectedData = [];
        e.map((item,index)=> {
            selectedData.push(item.value);
        })
        setSelectedDays(selectedData);
    }
    const handleSelectFacility = (e) => {
        var selectedData = [];
        e.map((item,index)=> {
            selectedData.push(item.value);
        })
        setSelectedFacilities(selectedData);
    }

    /* 식당 저장 */
    const addRestaurantInfo = () => {
        var today = new Date();
        /* 값 설정 */
        var name = document.getElementById("name").value;
        var category = document.getElementById("category").value;
        var content = document.getElementById("content").value;
        var phone = document.getElementById("phone").value;
        var tablePersonMax = parseInt(document.getElementById("tablePersonMax").value);
        var tablePersonMin = parseInt(document.getElementById("tablePersonMin").value);
        var openTime = document.getElementById("openTime").value + ':' + ('0' + today.getSeconds()).slice(-2);
        var lastOrderTime = document.getElementById("lastOrderTime").value + ':' + ('0' + today.getSeconds()).slice(-2);
        var closeTime = document.getElementById("closeTime").value + ':' + ('0' + today.getSeconds()).slice(-2);
        var address = document.getElementById("address").value;
        var detailAddress = document.getElementById("detailAddress").value;
        var lunchPrice = parseInt(document.getElementById("lunchPrice").value);
        var dinnerPrice = parseInt(document.getElementById("dinnerPrice").value);
        var reservationBeginDate = document.getElementById("reservationBeginDate").value;
        var reservationEndDate = document.getElementById("reservationEndDate").value;
        
        var info = {
            "name": name,
            "category": category,
            "content": content,
            "phone": phone,
            "tablePersonMax": tablePersonMax,
            "tablePersonMin": tablePersonMin,
            "openTime": openTime,
            "lastOrderTime": lastOrderTime,
            "closeTime": closeTime,
            "address": address,
            "detailAddress": detailAddress,
            "lunchPrice": lunchPrice,
            "dinnerPrice": dinnerPrice,
            "days": {
                "days": selectedDays
            },
            "reservationBeginDate": reservationBeginDate,
            "reservationEndDate": reservationEndDate,
            "facilities": selectedFacilities
        }

        /* 모두 필수 : 하나라도 입력하지 않은 경우 알림창 */
        if( !name|| !category || !content || !phone || !tablePersonMax || !tablePersonMin
            || !openTime || !lastOrderTime || !closeTime || !address || !detailAddress
            || !lunchPrice || !dinnerPrice || selectedDays.length == 0 || !reservationBeginDate
            || !reservationEndDate || selectedFacilities.length == 0) {
            alert("식당 정보를 모두 입력해주세요");
        }
        console.log(info);

        createRestaurant(info)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    /* 식당이 있으면 조회 */
    useEffect(()=> {
        // getRestaurant()

        //내 식당 정보 조회 및 세팅
        getMyRestaurant().then((res)=> {
            if (res) console.log(res);
            // setUser((prevUser) => ({
            //       ...prevUser,
            //       ["shop"] : {
            //         "name" : res.data.name,
            //         "category" : res.data.category,
            //         "content" : res.data.content,
            //       }
            //     }));
        });
    },[]);

    return(
        <MainContents className="main">
            <div className="mb-[10px]">
                <div className="container gutter-sm">
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">식당 이름</label></div>
                        <input type="text" className="form-input" id="name" placeholder="식당이름을 입력해주세요." value={user.shop.name}/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">카테고리</label></div>
                        <input type="text" className="form-input" id="category" placeholder="카테고리를 입력해주세요." value={user.shop.category}/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">식당 설명</label></div>
                        <textarea className="form-input" id="content" placeholder="식당 설명을 입력해주세요." rows='3' maxLength='35' value={user.shop.content}/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">식당 전화</label></div>
                        <input type="text" className="form-input" id="phone" placeholder="식당 전화 번호 입력해주세요. 예시 : 02-0000-0000"/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">한테이블 당 최대 인원</label></div>
                        <input type="number" className="form-input" id="tablePersonMax" placeholder="한 테이블 당 최대 인원을 입력해주세요."/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">한테이블 당 최소 인원</label></div>
                        <input type="number" className="form-input" id="tablePersonMin" placeholder="한 테이블 당 최소 인원을 입력해주세요."/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">오픈 시간</label></div>
                        <input type="time" className="form-input" id="openTime" />
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">라스트 오더 시간</label></div>
                        <input type="time" className="form-input" id="lastOrderTime"/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">마감 시간</label></div>
                        <input type="time" className="form-input" id="closeTime"/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">식당 주소</label></div>
                        <input type="number" className="form-input" id="address" placeholder="식당 주소를 입력해주세요."/>
                        <input type="number" className="form-input mt-[10px]" id="detailAddress" placeholder="식당 상세 주소를 입력해주세요."/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">점심 가격</label></div>
                        <input type="number" className="form-input" id="lunchPrice" placeholder="점심 시간을 입력해주세요."/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">저녁 가격</label></div>
                        <input type="number" className="form-input" id="dinnerPrice" placeholder="저녁 가격을 입력해주세요."/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">운영 날짜</label></div>
                        <Select options={daysOptions}
                            defaultValue='월'
                            isMulti
                            className="basic-multi-select"
                            onChange={handleSelectDay}
                            >
                        </Select>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">예약 오픈 일자</label></div>
                        <input type="date" className="form-input" id="reservationBeginDate"/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">예약 마감 일자</label></div>
                        <input type="date" className="form-input" id="reservationEndDate"/>
                    </div>
                    <div className="form-block mb-[20px]">
                        <div className="mb-[6px]"><label className="color-gray text-[12px]">편의 시설</label></div>
                        <Select options=  {facilityOptions}                            
                            isMulti
                            className="basic-multi-select"
                            onChange={handleSelectFacility}>
                        </Select>
                    </div>
                </div>
            </div>
            <div>
                <button className="btn btn-md btn-outline btn-rounded" onClick={addRestaurantInfo}>저장</button>
            </div>
        </MainContents>
    )
}

const MainContents = styled.div`
  padding-bottom: 48px;
  box-sizing: border-box;
  min-height: calc(100vh - 47px);
  margin-top: 47px;
`