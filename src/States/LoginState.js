import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key : 'user',
  storage : sessionStorage,
})


export const LoginState = atom({
  key: "LoginState",
  effects_UNSTABLE : [persistAtom],
  default: {
    id: "",
    nickname: "",
    introduce: "",
    isOwner: false,
    isSaved : false,
    shop: {
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
          name: " ",
          path: "https://skyware-toy-project-imgae-bucket.s3.ap-northeast-2.amazonaws.com/facility-icon/ic_corkage.svg",
        },
      ],
      days: {
        days: ["MONDAY", "TUESDAY"],
    businessRegistrationNumber: "",
    createdDate: "",
    email: "",
    imagePath: "",
    name: "",
    ownerId: null,
    status: "",
    updatedDate: "",
  },
  effects_UNSTABLE: [persistAtom],
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
        name: " ",
        path: "",
      },
    ],
    days: {
      days: [],
    },
    reviewComments: [],
    lat: 0,
    lng: 0,
  },
  effects_UNSTABLE: [persistAtom],
  // },
});
