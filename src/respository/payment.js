import apiClient from "../apis/ApiClient";

/**
 * 결제 api
 * 
 * @author jimin
 */


export const requestPayment = async(data) => {
    try{
        const token = localStorage.getItem("token");
        console.log('data : ', data, 'token : ', token);
        const result = await apiClient.post(`/payments`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        
        return result;
    } catch ( err ) {
        console.log("Error >>", err);
    }
}