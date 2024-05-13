import apiClient from "../apis/ApiClient";

/**
 * 검색 api
 * 
 * @author jimin
 */
/* 식당 필터 검색 */
export const searchByFilter = async(params) => {
    try{
        console.log(params);
        const result = await apiClient.get(`/restaurants/search`, params, JSON.stringify(params), {
            headers : {
                "Content-Type" : `application/json`
            }
        });
        return result;
    } catch(err) {
        console.log("Error >>", err);
    }
}
/* 식당 요약 검색 */
export const searchByKeyword = async(params) => {
    try{
        console.log(params);
        const keyword = params;
        const result = await apiClient.get(`/restaurants/search/${keyword}`, {
            headers : {

            }
        })
        return result;
    } catch(err) {
        console.log("Error >>", err);
    }
}