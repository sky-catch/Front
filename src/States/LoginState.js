import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});

export const LoginState = atom({
  key: "LoginState",
  effects_UNSTABLE: [persistAtom],
  default: {
    id: "",
    nickname: "",
    introduce: "",
    owner: false,
    isSaved: false,
    saveRestaurants: [],
    businessRegistrationNumber: "",
    createdDate: "",
    email: "",
    name: "",
    ownerId: null,
    status: "",
    updatedDate: "",
    profileImg : "",
    reviews : []
  },
});
// 식당 리스트
export const RestaurantsAll = atom({
  key: "RestaurantsAll",
  effects_UNSTABLE: [persistAtom],
  default: null,
});
export const RestaurantState = atom({
  key: "RestaurantState",
  default: {
    // shop: {
    name: "",
    category: "",
    content: "",
    phone: "",
    tablePersonMax: 0,
    tablePersonMin: 0,
    openTime: "",
    lastOrderTime: "",
    closeTime: "",
    address: "",
    detailAddress: "",
    createdDate: "",
    updatedDate: "",
    restaurantId: 0,
    ownerId: 0,
    lunchPrice: 0,
    dinnerPrice: 0,
    savedCount: 0,
    reviewCount: 0,
    reviewAvg: 0,
    images: [],
    notifications: [],
    facilities: [
      {
        name: null,
        path: null,
      },
    ],
    holidays: {
      days: [],
    },
    reviewComments: [],
    lat: 0,
    lng: 0,
  },
  effects_UNSTABLE: [persistAtom],
  // },
});
