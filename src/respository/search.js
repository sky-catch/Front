import apiClient from "../apis/ApiClient";

/**
 * 검색 api
 * 
 * @author jimin
 */

const token = sessionStorage.getItem("token");
/* 식당 필터 검색 */
export const searchByFilter = async(search) => {
    try{
        const [info] = search;
        //쿼리스트링으로 보내야한다.
        
        const params = new URLSearchParams();
        Object.entries(info).forEach(([key,value])=> {
            params.append(key,value);
        })
        console.log('text',params.toString(), info);

        const result = await apiClient.get(`/restaurants/search${params.toString()}`, {params : info},{
            headers : {
                "Content-Type" : `application/json`,
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(result.data);
        return result.data;
    } catch(err) {
        console.log("Error >>", err);
    }
}
/* 식당 요약 검색 */
export const searchByKeyword = async(params) => {
    try{
        const keyword = params;
        // console.log(keyword);
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