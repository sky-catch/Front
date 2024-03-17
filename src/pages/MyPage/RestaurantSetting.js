import { createRestaurant } from "../../respository/restaurant";

export default function Restaurantsetting () {

    const addRestaurant = () => {
        const myRestaurant = {
            name: "스시미루",
            category: "스시오마카세",
            content: "아름다운 맛과 다채로운 구성, 술 곁들이기 아늑한 분위기의 스시오마카세",
            phone: "02-6402-4044",
            capacity: 5,
            openTime : "22:00:00",
            lastOrderTime : "22:00:00",
            closeTime : "22:00:00",
            address : "압구정로데오",
            detailAddress : "서울특별시 강남구 언주로170길 26-6 2층",
            lunchPrice : 70000,
            dinnerPrice : 140000,
            facilities : [
                "PARKING",
                "CORKAGE"
            ]
        };

        createRestaurant(myRestaurant)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div>
            <button className="btn btn-md btn-outline btn-rounded" onClick={addRestaurant}>저장</button>
        </div>
    );
}