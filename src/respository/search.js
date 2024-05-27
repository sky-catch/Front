import apiClient from "../apis/ApiClient";

/**
 * 검색 api
 * 
 * @author jimin
 */
/* 식당 필터 검색 */
export const searchByFilter = async({queryKey}) => {
    try{
        const [params] = queryKey;
        console.log('text',params);
        const result = await apiClient.get(`/restaurants/search`, params, JSON.stringify(params), {
            headers : {
                "Content-Type" : `application/json`
            }
        });
        return result.data;
    } catch(err) {
        console.log("Error >>", err);
    }
}
/* 식당 요약 검색 */
export const searchByKeyword = async({queryKey}) => {
    try{
        const [keyword] = queryKey;
        if(keyword?.length < 2) return [];  // 2글자 이상만 검색 가능
        const result = await apiClient.get(`/restaurants/search/${keyword}`, {
            headers : {

            }
        })
        return result.data;
    } catch(err) {
        console.log("Error >>", err);
        throw new Error("Failed to fetch data");
    }
}