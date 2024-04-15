import apiClient from "../apis/ApiClient";

/**
 * 결제 api
 * 
 * @author jimin
 */


export const requestPayment = async(data) => {
    try{
        console.log('data : ', data);

        const result = await apiClient.post('/payments', data, {
            headers: {
            //   Authorization: `Bearer ${token}`,
            },
          });
    } catch ( err ) {
        console.log("Error >>", err);
    }
}