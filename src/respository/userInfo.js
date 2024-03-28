import apiClient from "../apis/ApiClient";

/**
 * 사용자 관련정보 (저장레스토랑)
 *
 * @author jimin
 */
/* 저장된 레스토랑 정보 불러오기 */
export default getSavedRestaurants = async(name) => {
    try{
        const result = await apiClient.post("", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

    }catch (err) {
        console.log("Error >>", err);
    }
}