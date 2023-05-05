import { GetMerchantInfo } from "@/src/services/merchant/merchant.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
//import { useRouter } from "next/router";

export const useGetMerchantInfo = () => {

    // return useQuery(["merchant"], () => GetMerchantInfo(), {
    //     onError(err: AxiosError) {
    //         console.log(err.response?.status)
    //     },
    // });
    return useQuery(["merchant"], () => GetMerchantInfo());

};