import apiClient from "../apis/ApiClient";

/**
 * 검색 api
 * 
 * @author jimin
 */

const token = sessionStorage.getItem("token");
/* 식당 필터 검색 */
export const searchByFilter = async(params) => {
    try{
        //쿼리스트링으로 보내야한다.
        const data = new URLSearchParams();
        Object.entries(params).forEach(([key,value])=> {
            if(key == 'hotPlace' || key == 'koreanCity') {
                if(value) data.append(key,value);
            }else {
                data.append(key,value);
            }
        })
        const result = await apiClient.get(`/restaurants/search?${data.toString()}`, {
            headers : {
                "Content-Type" : `application/json`,
                Authorization: `Bearer ${token}`,
            }
        });
        return result.data;
    } catch(err) {
        console.log("Error >>", err);
        throw new Error("Failed to fetch data");
    }
}
/* 식당 요약 검색 */
export const searchByKeyword = async(params) => {
    try{
        const keyword = params;
        
        if(keyword?.length < 2) return [];  // 2글자 이상만 검색 가능
        const result = await apiClient.get(`/restaurants/search/${keyword}`, {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
        return result.data;
    } catch(err) {
        console.log("Error >>", err);
        throw new Error("Failed to fetch data");
    }
}