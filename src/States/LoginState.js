import { atom } from "recoil";

export const LoginState = atom({
  key: "LoginState",
  default: {
    id: "",
    nickname: "",
    introduce: "",
    isOwner: false,
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
  },
});
