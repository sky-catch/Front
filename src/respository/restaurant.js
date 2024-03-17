import apiClient from '../apis/ApiClient';

/**
 * API 식당
 * 
 * @author jimin
 */

/* 식당 생성 */
export const createRestaurant = async (data) => {
    try {
        console.log(data);
        const result = await apiClient.post( "/restaurants", {
            data
        });
        return result;
    } catch (err) {
        console.log("Error >>", err);
    }
}

/* 식당 개별 조회 */
export const getRestaurant = async ( id ) => {
    try {
        console.log(id);
        const res = await apiClient.get(`/restaurants/${id}`, {
            headers : {
                // Authorization : `Bearer ${}`
            }
        });
        return res;
    } catch (err) {
        console.log("Error >>", err);
    }
};